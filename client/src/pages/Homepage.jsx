import React from "react";
import { Link } from "@nextui-org/react";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="mb-2 text-4xl text-white">
        Welcome to Employee Management
      </h1>
      <p className="mb-4 text-2xl text-secondary">
        Please navigate through our options
      </p>
      <div className="flex gap-4">
        <Link href="/designations" className="text-success text-lg font-semibold" color="foreground" isBlock showAnchorIcon>
          Designations
        </Link>
        <Link href="/employees" className="text-secondary text-lg font-semibold" color="foreground" isBlock showAnchorIcon>
          Employees
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
