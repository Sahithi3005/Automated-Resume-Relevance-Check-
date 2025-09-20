import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const loc = useLocation();
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-indigo-600 font-bold text-xl">Innomatics — Resume Relevance</div>
          <div className="text-sm text-gray-600 hidden md:block">Automated scoring & feedback</div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className={`px-3 py-2 rounded ${loc.pathname === "/" ? "bg-indigo-100" : "hover:bg-gray-50"}`}>Home</Link>
          <Link to="/dashboard" className={`px-3 py-2 rounded ${loc.pathname === "/dashboard" ? "bg-indigo-100" : "hover:bg-gray-50"}`}>Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
