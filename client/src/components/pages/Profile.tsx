import { profileState } from "@/state/atoms/Profile";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "@/helpers/Url";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";
import { ProfileForm } from "./ProfileForm";

const Profile = () => {
  const [userInfo, setUserInfo] = useRecoilState(profileState);
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const [image, setImage] = useState<string>("");
  const [waitingForImage, setWaitingForImage] = useState("not-waiting");
  const { toast } = useToast();

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    const base64: any = await convertToBase64(file);
    setImage(base64);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (image === "") {
      return;
    }
    setWaitingForImage("waiting");
    const response = await axios.post(
      url + "user/profile-img",
      {
        avatar: image,
      },
      {
        headers: {
          token: cookies.token,
        },
      }
    );
    const local = JSON.parse(localStorage.getItem("userInfo") || "{}");
    local.avatar = image;
    localStorage.setItem("userInfo", JSON.stringify(local));
    if (response.status == 200) {
      setWaitingForImage("uploaded");
      toast({
        description: "Your profile has been updated.",
      });
      setTimeout(() => {
        setWaitingForImage("not-waiting");
      }, 2000);
    }
    setUserInfo(local);
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <main className="p-24">
      <div className="p-4 border-gray-400 border-[1px] rounded-xl">
        <div className="text-xl font-bold">Profile</div>
        <hr className="my-4" />
        <div className="flex gap-20">
          <div className="p-3 relative w-fit">
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-56 w-56">
                  <AvatarImage src={userInfo?.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <div>
                  <Dialog>
                    <DialogTrigger className="p-2 text-sm cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-900">
                      Upload Photo
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload a photo</DialogTitle>
                        <form
                          onSubmit={handleSubmit}
                          className="py-4 flex justify-between"
                        >
                          <input
                            onChange={handleImage}
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            className="file:rounded-lg file:border-none file:p-3 file:font-semibold dark:file:bg-slate-900 dark:file:text-white"
                          />
                          {waitingForImage !== "not-waiting" ? (
                            waitingForImage === "uploaded" ? (
                              <Button className="bg-green-900 text-white">
                                Done
                              </Button>
                            ) : (
                              <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                              </Button>
                            )
                          ) : (
                            <Button type="submit">Confirm</Button>
                          )}
                        </form>
                        <DialogDescription>
                          You can change it anytime.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <hr />
                <div className="p-2 text-sm cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-900">
                  Remove Photo
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <ProfileForm></ProfileForm>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
