import React from "react";
import ZestLogo from "../../assets/zestdark.svg";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./button";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex w-11/12 justify-between items-center p-5 fixed">
        <NavLink to="/">
        <div className="relative cursor-pointer">
          <img className="h-9" src={ZestLogo} alt="" />
          <div className="text-4xl font-bold absolute -top-2 left-12">zest</div>
        </div>
        </NavLink>
        <div className="flex items-center justify-center gap-3">
            <NavLink to="register">
          <Button className="h-11 w-28 text-lg">Register</Button>
            </NavLink>
          <ModeToggle/>
        </div>
      </div>
    </>
  );
};

export default Header;
