import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Toaster toastOptions={{ duration: 4000 }} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
