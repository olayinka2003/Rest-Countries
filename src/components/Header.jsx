import { BiSun } from "react-icons/bi"; 
import React from "react";
import { BsMoon } from "react-icons/bs";

export default function  Header({ isDarkMode, setIsDarkMode }) {
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  return (
    <header
      className={`${
        isDarkMode ? "bg-[#2b3945]" : "bg-white"
      }  mx-auto flex items-center justify-between p-4 shadow lg:w-[90%] `}
    >
      <h1 className="font-bold">Where in the world?</h1>
      <div
        onClick={toggleTheme}
        className="flex items-center gap-1 font-semibold cursor-pointer"
      >
       {isDarkMode? <BiSun /> :<BsMoon />}
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </div>
    </header>
  );
}
