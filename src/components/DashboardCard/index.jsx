import React from "react";
import { Trash2, Pencil } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";

const statusColorMap = {
  "In Progress": "#3E4E96",
  Completed: "#2E8B57",
  "On Hold": "#FFA500",
  "Not Started": "#D3D3D3",
};

const DashboardCard = ({ title, status, onDelete, onEdit }) => {
  const statusDotColor =
    statusColorMap[status] || statusColorMap["Not Started"];

  return (
    <Card className="w-[300px] h-[300px] m-2 rounded-lg shadow-md overflow-hidden flex flex-col justify-end">
      <CardContent
        className="p-0 m-4 mt-0 mb-0 h-[70%]"
        style={{
          backgroundColor: statusDotColor,
        }}
      ></CardContent>
      <CardFooter className="p-4 flex flex-col items-start bg-white border-t border-gray-100">
        <div className="flex justify-between items-center w-full mb-1">
          <h3 className="text-gray-900 text-lg font-semibold truncate max-w-[75%]">
            {title}
          </h3>
          <div className="flex items-center space-x-3 text-gray-400">
            <Pencil
              className="h-4 w-4 cursor-pointer transition-colors text-blue-600"
              onClick={onEdit}
              title="Edit Project"
            />
            <Trash2
              className="h-4 w-4 cursor-pointer transition-colors text-red-500"
              onClick={onDelete}
              title="Delete Project"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: statusDotColor }}
          />

          <p className="text-gray-600 text-sm font-medium">{status}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
