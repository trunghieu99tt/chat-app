import { atom, selector } from "recoil";
import { iUser } from "../types/user.types";

export const userState = atom<iUser | null>({
    key: "user",
    default: null,
});

export const fullNameSelector = selector({
    key: 'fullNameSelector',
    get: ({ get }) => {
        const user = get(userState);
        const fullName = user?.firstName + " " + user?.lastName;
        return fullName;
    },
})