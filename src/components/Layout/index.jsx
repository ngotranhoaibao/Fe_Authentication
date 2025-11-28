import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="">
      <Header />
      <main className="grid gap-6 mx-5 max-w-7xl md:mx-auto my-10 mt-20 mb-6 min-h-[60vh]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
