import { atom } from "recoil";

export type userInfo = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string
}

export const profileState = atom<userInfo>({
    key: "profileState",
    default: undefined
})