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
import axios from "axios";
import { url } from "@/helpers/Url";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { loginState } from "@/state/atoms/LoginState";

const registerSchema = z.object({
  username: z.string().max(16).trim(),
  password: z.string().min(6),
  firstName: z.string().max(45).trim(),
  lastName: z.string().max(45).trim(),
  email: z.string().email().trim(),
});

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const navigate = useNavigate();

  const [regError, setRegError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [login, setLogin] = useRecoilState(loginState);

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const response = await axios.post(url + "user/register", values);
    if (response.data.err) {
      setRegError("exists");
      setTimeout(() => {
        setRegError("");
      }, 2000);
    } else {
      setRegError("success");
      setCookie('token', response.data.token);
      setLogin(true);
      setTimeout(() => {
        navigate("/");
        setRegError("");
      }, 2000);
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
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input placeholder="eg. John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl>
                          <Input placeholder="eg. Morgan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. johnmorgan@mail.com" {...field} />
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
                    <FormDescription>Keep it strong.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 items-center relative">
                {regError == "" ? (
                  <Button type="submit">Register</Button>
                ) : regError == "exists" ? (
                  <Button className="bg-red-600 text-white" disabled>
                    Already Exists
                  </Button>
                ) : (
                  <Button className="bg-green-600 text-white" disabled>
                    Success
                  </Button>
                )}
                <div
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-sm underline"
                >
                  Already Registered?
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
