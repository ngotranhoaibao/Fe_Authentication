import api from "@/services/api/index.js";
export const getProjects = async () => {
  const res = await api.get("/project");
  return res.data.data; 
};

export const createProject = async (project) => {
  const res = await api.post("/project", project);
  return res.data.data;
};
export const updateProject = async (project) => {
  const res = await api.put(`/project/${project.id}`, project);
  return res.data.data;
};
export const deleteProject = async (id) => {
  const res = await api.delete(`/project/${id}`);
  return res.data.data;
};