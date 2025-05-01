import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from "./types";

type SearchValue = {
    value: string;
    setValue: (newValue: string) => void;
}

export const useSearchValue = create<SearchValue>(set => ({
    value: "",
    setValue: (newValue: string) => set({ value: newValue }),
}))

type CartState = {
    items: ProductType[];
    addToCart: (product: ProductType) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addToCart: (product) => {
      const exists = get().items.find((p) => p.id === product.id);
      if (exists) {
        set({
          items: get().items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity! + 1 }
              : item
          ),
        });
      } else {
        set({ items: [...get().items, { ...product, quantity: 1 }] });
      }
    },
    increaseQuantity: (id) => {
        set({
            items: get().items.map((item) => 
                item.id === id ? { ...item, quantity: item.quantity! + 1 } : item
            )
        })
    },
    decreaseQuantity: (id) => {
        set({
            items: get().items.map((item) => 
                item.id === id ? { ...item, quantity: item.quantity! - 1 } : item
            )
        })
    },
    removeFromCart: (id) => {
        set({
            items: get().items.filter((item) => item.id !== id)
        })
    }
  }))
// export const useCartStore = create<CartState>()(
//     persist(
//         ((set, get) => ({
//             items: [],
//             addToCart: (product) => {
//               const exists = get().items.find((p) => p.id === product.id);
//               if (exists) {
//                 set({
//                   items: get().items.map((item) =>
//                     item.id === product.id
//                       ? { ...item, quantity: item.quantity! + 1 }
//                       : item
//                   ),
//                 });
//               } else {
//                 set({ items: [...get().items, { ...product, quantity: 1 }] });
//               }
//             },
//             increaseQuantity: (id) => {
//                 set({
//                     items: get().items.map((item) => 
//                         item.id === id ? { ...item, quantity: item.quantity! + 1 } : item
//                     )
//                 })
//             },
//             decreaseQuantity: (id) => {
//                 set({
//                     items: get().items.map((item) => 
//                         item.id === id ? { ...item, quantity: item.quantity! - 1 } : item
//                     )
//                 })
//             },
//             removeFromCart: (id) => {
//                 set({
//                     items: get().items.filter((item) => item.id !== id)
//                 })
//             }
//           })),
//           {
//             name: 'cart-storage',
//             storage: createJSONStorage(() => sessionStorage),
//           },
//     )
// )

type FavoriteState = {
    items: ProductType[],
    toggleFavorites: (product: ProductType) => void;
}

export const useFavoritesStore = create<FavoriteState>()(
    persist(
        ((set, get) => ({
            items: [],
            toggleFavorites: (product) => {
                set({
                    items: get().items.some((item) => item.id === product.id)
                        ? get().items.filter((item) => item.id !== product.id)
                        : [...get().items, product]
                })
            }
        })),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)