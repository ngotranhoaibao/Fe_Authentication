import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ title, description, onSearchChange, searchTerm }) => { 
    const navigate = useNavigate();

    const handleNewProjectClick = () => {
        navigate("/projects");
    };

    const handleInputChange = (event) => {
        if (onSearchChange) {
            onSearchChange(event.target.value);
        }
    };

    return (
        <header className="flex items-center justify-between px-8 py-3">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">{title}</h1>
                {title !== "Dashboard" && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>
            {title !== "Create new Project" && title !== "Profile" && (
                <div className="flex items-center gap-3">
                    <Input
                        type="text"
                        placeholder="Search projects..."
                        className="w-[300px]"
                        value={searchTerm} 
                        onChange={handleInputChange}
                    />
                    <Button
                        onClick={handleNewProjectClick}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2"
                    >
                        <Plus className="h-4 w-4" />
                        <span>New Project</span>
                    </Button>
                </div>
            )}
        </header>
    );
};

export default Header;