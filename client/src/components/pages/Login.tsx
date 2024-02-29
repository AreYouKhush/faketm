import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import bgImg from "../../assets/markus-winkler-ahjzVINkuCs-unsplash-Photoroom.png-Photoroom.png";
import "../../App.css";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { loginState } from "@/state/atoms/LoginState";
import { url } from "@/helpers/Url";
import axios from "axios";
import { useCookies } from "react-cookie";
import { profileState } from "@/state/atoms/Profile";

const registerSchema = z.object({
  username: z.string().trim(),
  password: z.string().min(6),
});

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [login, setLogin] = useRecoilState(loginState);
  const [logError, setLogError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [userInfo, setUserInfo] = useRecoilState(profileState);

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const response = await axios.post(url + "user/login", values);
    if(response.data.err){

    }else{
      setLogin(true);
      setCookie('token', response.data.token);
      navigate("/");
      localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
      setUserInfo(response.data.userInfo);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 h-svh py-10">
        <div className="bg-gray-950 rounded-xl m-8 overflow-hidden relative max-h-[600px] max-w-[900px] left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
          <div className="font-bold text-5xl text-white absolute top-4 left-7 z-10">
            zest
          </div>
          <div className="font-bold text-3xl text-gray-300 absolute top-20 left-7 w-60 z-10">
            your gateway to managing your finances
          </div>
          <div className="border-gray-300 border-2 h-48 w-96 absolute -right-12 bottom-14 rounded-xl"></div>
          <div className="absolute bottom-5 -right-5">
            <img
              className="mix-blend-luminosity max-w-[44rem]"
              src={bgImg}
              alt=""
            />
          </div>
        </div>
        <div className="p-5 flex items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-9/12"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username / E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Username / E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 items-center">
                <Button type="submit">Login</Button>
                <div
                  onClick={() => navigate("/register")}
                  className="cursor-pointer text-sm underline"
                >
                  New Here?
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
