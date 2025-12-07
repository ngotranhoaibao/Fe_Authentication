import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CreateProjectCard = ({
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  onCreateProject,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Vui lòng điền đầy đủ Tiêu đề và Mô tả dự án.");
      return;
    }

    const projectData = {
      title,
      description,
      status: status || "Not Started",
    };

    setIsLoading(true);
    try {
      await onCreateProject(projectData);

      setTitle("");
      setDescription("");
      setStatus("Not Started");
      alert("Dự án đã được tạo thành công!");
    } catch (error) {
      alert(`Tạo dự án thất bại: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-6xl">
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="project-title"
                className="font-semibold text-base"
              >
                Project Title
              </Label>
              <Input
                id="project-title"
                placeholder="Enter a clear and concise project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="project-description"
                className="font-semibold text-base"
              >
                Project Description
              </Label>
              <Textarea
                id="project-description"
                placeholder="Provide a detailed description of the project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="">
              <Label
                htmlFor="project-status"
                className="font-semibold text-base"
              >
                Status
              </Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger id="project-status" className="w-full">
                  <SelectValue placeholder="Not Started" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-6 border-t mt-4">
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setStatus("Not Started");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CreateProjectCard;
