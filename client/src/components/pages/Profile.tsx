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

const Profile = () => {
  const [userInfo, setUserInfo] = useRecoilState(profileState);
  const [image, setImage] = useState('');
  const handleImage = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0]);
  }

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
        <div>
          <div className="relative w-fit">
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
                        <div className="py-4 flex justify-between">
                          <input
                          onChange={handleImage}
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            className="file:rounded-lg file:border-none file:p-3 file:font-semibold dark:file:bg-slate-900 dark:file:text-white"
                          />
                          <Button onClick={handleImage}>Confirm</Button>
                        </div>
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
        </div>
      </div>
    </main>
  );
};

export default Profile;
