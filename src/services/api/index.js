import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

/**
 * Run queued request resolvers/rejecters and clear the queue.
 * @param {Error|null} error
 * @param {string|null} token
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const saveAccessToken = (token) =>
  localStorage.setItem("accessToken", token);
export const removeAuthTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userInfo");
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Main axios instance used by the app (has interceptors).
 */
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Helper that navigates to sign-in only once (avoids double redirects).
 */
const redirectToSignIn = () => {
  const signInPath = "/sign-in";
  if (window.location.pathname !== signInPath) {
    // use assign so history is preserved/clearer semantics
    window.location.assign(signInPath);
  } else {
    // if already on sign-in, reload to reset app state
    window.location.reload();
  }
};

/**
 * Response interceptor that tries to refresh access token on 401.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    // Defensive: if no original request or no status, just reject
    if (!originalRequest || !status) return Promise.reject(error);

    // Treat auth endpoints as excluded from refresh flow
    const url = originalRequest.url || "";
    const isAuthEndpoint =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh-token");

    if (status !== 401) return Promise.reject(error);

    if (isAuthEndpoint) {
      // if login/register/refresh failed with 401, just forward the error
      return Promise.reject(error);
    }

    // prevent retry loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If a refresh is already happening, queue this request and return a promise
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    // Begin refresh flow
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Use a separate axios instance WITHOUT our interceptors to avoid recursion
      const refreshClient = axios.create({
        baseURL: API_BASE,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      const refreshRes = await refreshClient.post("/auth/refresh-token");

      const newAccessToken =
        refreshRes?.data?.data?.accessToken || refreshRes?.data?.accessToken;

      if (!newAccessToken) {
        // If refresh succeeded but token missing, treat as failure
        throw new Error("Missing new access token from refresh response");
      }

      // Persist the new token for future requests
      saveAccessToken(newAccessToken);
      api.defaults.headers = api.defaults.headers || {};
      api.defaults.headers.common = api.defaults.headers.common || {};
      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      // Resolve queued requests with the fresh token
      processQueue(null, newAccessToken);

      // Retry original request with the new token
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      // Notify queued requests of the error
      processQueue(refreshError, null);

      // Clear tokens and redirect to sign-in
      try {
        removeAuthTokens();
      } catch (e) {
        // still redirect even if removeAuthTokens has a problem
        console.error("Error removing auth tokens:", e);
      }

      redirectToSignIn();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
