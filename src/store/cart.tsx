import { create } from "zustand";
import { ProductSelected } from "../../type.t";
import { persist } from "zustand/middleware";

export interface CartStore {
  cart: ProductSelected[];
  addCart: (productSelected: ProductSelected) => void;
  removeCart: (productSelected: ProductSelected[]) => void;
  increaseProduct: (productId: number) => void;
  decreaseProduct: (productId: number) => void;
}

export const useCart = create(
  persist<CartStore>(
    (set) => ({
      cart: [],
      addCart: (productSelected) =>
        set((state) => ({ cart: [...state.cart, productSelected] })),
      removeCart: (productSelected) => set(() => ({ cart: productSelected })),
      increaseProduct: (productId) =>
        set((state) => {
          const newCart = state.cart.map((product) => {
            if (product.productId === productId) {
              product.amount++;
            }
            return product;
          });
          return { cart: newCart };
        }),
        decreaseProduct: (productId) =>
        set((state) => {
          const newCart = state.cart.map((product) => {
            if (product.productId === productId) {
              product.amount--;
            }
            return product;
          });
          return { cart: newCart };
        }),
    }),

    {
      name: "cart-storage",
    }
  )
);
