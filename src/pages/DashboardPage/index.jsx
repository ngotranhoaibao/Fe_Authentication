// --- DashboardPage.jsx ---

import React, { useState, useEffect } from "react";
import DashboardCard from "@/components/DashboardCard";
import { getProjects, deleteProject } from "@/services/api/project.js";
import Header from "@/components/Header";
import { toast } from "react-hot-toast";
const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.log("error", error);
        toast.error(error.response.data.message);
      }
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
      console.log("Xóa thành công, state đã cập nhật.");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const handleSearch = (term) => {
    setSearchTerm(term);

    console.log("Searching for:", term);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header
        title="Dashboard"
        description=""
        onSearchChange={handleSearch}
        searchTerm={searchTerm}
      />
      <div className="grid grid-cols-3 gap-4 p-4">
        {filteredProjects.map((project, index) => (
          <DashboardCard
            key={project._id || index}
            title={project.title}
            status={project.status}
            color={project.color}
            onDelete={() => handleDeleteProject(project._id)}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardPage;
