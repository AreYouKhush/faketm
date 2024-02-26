import React from "react";
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

const registerSchema = z.object({
  username: z.string().max(16).trim(),
  password: z.string().min(6),
  firstName: z.string().max(45).trim(),
  lastName: z.string().max(45).trim(),
});

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="grid grid-cols-2 h-svh py-10">
        <div className="bg-gray-950 rounded-xl m-8 overflow-hidden relative max-h-[600px] max-w-[900px] left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
          <div className="font-bold text-5xl text-white absolute top-4 left-7">
            zest
          </div>
          <div className="font-bold text-3xl text-gray-300 absolute top-20 left-7 w-60">
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>Keep it strong.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
