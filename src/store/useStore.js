import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { persist } from "zustand/middleware";
import { createProductsSlice } from "./slices/productsSlice";
import { createCartSlice } from "./slices/cartSlice";
import { createUiSlice } from "./slices/uiSlice";

export const useStore = create(persist((set, get) => ({
    ...createAuthSlice(set, get),
    ...createProductsSlice(set, get),
    ...createCartSlice(set, get),
    ...createUiSlice(set, get)
}),
{
    name: "auth-storage",
    partialize: (state) => ({
        token: state.token,
        user: state.user,
        cart: state.cart
    })
}
))