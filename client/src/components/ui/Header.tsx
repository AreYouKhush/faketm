import React from "react";
import ZestLogo from "../../assets/zestdark.svg";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./button";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "@/state/atoms/LoginState";
import { useCookies } from "react-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { profileState } from "@/state/atoms/Profile";

const Header = () => {
  const [login] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [userInfo] = useRecoilState(profileState);

  const logout = () => {
    localStorage.clear();
    removeCookie("token");
  };
  return (
    <>
      <div className="w-full py-5 px-14 fixed z-50">
        <div className="flex justify-between items-center p-3 backdrop-blur-xs rounded-2xl">
          <NavLink to="/">
            <div className="cursor-pointer relative">
              <img className="h-10" src={ZestLogo} alt="" />
              <div className="text-4xl font-bold absolute -right-20 -top-1">zest</div>
            </div>
          </NavLink>
          <div className="flex items-center justify-center gap-3">
            {login ? (
              <div className="cursor-pointer px-3">
                <Popover>
                  <div className="flex justify-center items-center gap-3">
                    {login && (
                      <>
                        <div className="text-lg border-white font-semibold">
                          {userInfo?.username}
                        </div>
                      </>
                    )}
                    <PopoverTrigger>
                      <Avatar>
                        <AvatarImage src={userInfo?.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className="flex flex-col p-0">
                    <NavLink to="/profile">
                      <div className="cursor-pointer font-semibold select-none px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-900 duration-100 text-sm">
                        Profile
                      </div>
                    </NavLink>
                    <hr />
                    <a href="/">
                      <button
                        onClick={logout}
                        className="cursor-pointer font-semibold select-none px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-900 duration-100 text-sm"
                      >
                        Logout
                      </button>
                    </a>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <NavLink to="register">
                <Button>Register</Button>
              </NavLink>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
