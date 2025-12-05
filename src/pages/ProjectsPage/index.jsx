import React, { useState } from "react";
import Header from "@/components/Header";
import CreateProjectCard from "@/components/CreateProjectCard";
import { createProject } from "@/services/api/project.js";

const ProjectPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const handleCreateProject = async (projectData) => {
    console.log("Dữ liệu gửi đi để tạo dự án:", projectData);
    try {
      const response = await createProject(projectData);
      console.log("Dự án được tạo thành công:", response);
      return response;
    } catch (error) {
      console.error("Lỗi khi gọi API tạo dự án:", error);
      throw new Error(error.message || "Tạo dự án thất bại do lỗi hệ thống.");
    }
  };
  return (
    <div>
      <Header
        title="Create new Project"
        description="Fill in the details below to get started"
      />
      <CreateProjectCard onCreateProject={handleCreateProject} 
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
};

export default ProjectPage;
