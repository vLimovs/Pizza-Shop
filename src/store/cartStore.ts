import { create } from "zustand";
import { IProduct } from "../types/types";
interface ICartStore {
    cart: IProduct[]
    setCartValue: (value: IProduct[]) => void
}
const cartStore = create<ICartStore>((set) => ({
    cart: [],
    setCartValue: (value) => set({ cart: value })
}))

export default cartStore