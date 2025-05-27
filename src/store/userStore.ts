import { create } from "zustand";
import { IUserStore } from "../types/types";

const userStore = create<IUserStore>((set) => ({
    user: null,
    isAuth: false,
    setUser: (data) => set({user: data, isAuth: true}),
    logout: () => set({user: null, isAuth: false})
}))

export default userStore