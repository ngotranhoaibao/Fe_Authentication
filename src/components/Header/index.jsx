import React, { useContext } from "react";
import {IconUserCircle,IconLicense} from "@tabler/icons-react"
import { Button } from "../ui/button";
import AuthContext from "@/contexts/authContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { logout } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b">
      <div className="flex items-center gap-3">
        <IconLicense className="w-10 h-10" />
        <h1 className="text-xl font-bold">MyApp</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <IconUserCircle className="w-10 h-10"/>
            <span className="hidden sm:inline">Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuItem onClick={logout} className="cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
