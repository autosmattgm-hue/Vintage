"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import type { Product } from "@/lib/catalog";

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  wishlist: Product[];
  drawerOpen: boolean;
};

type CartContextValue = CartState & {
  subtotal: number;
  lineCount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
};

type CartAction =
  | { type: "hydrate"; payload: Pick<CartState, "lines" | "wishlist"> }
  | { type: "add"; product: Product; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "quantity"; productId: string; quantity: number }
  | { type: "clear" }
  | { type: "drawer"; open: boolean }
  | { type: "wishlist"; product: Product };

const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = {
  lines: [],
  wishlist: [],
  drawerOpen: false
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { ...state, lines: action.payload.lines, wishlist: action.payload.wishlist };
    case "add": {
      const existing = state.lines.find((line) => line.product.id === action.product.id);
      const lines = existing
        ? state.lines.map((line) =>
            line.product.id === action.product.id
              ? { ...line, quantity: Math.min(line.quantity + action.quantity, action.product.inventory) }
              : line
          )
        : [...state.lines, { product: action.product, quantity: Math.min(action.quantity, action.product.inventory) }];

      return { ...state, lines, drawerOpen: true };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((line) => line.product.id !== action.productId) };
    case "quantity":
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.product.id === action.productId
            ? { ...line, quantity: Math.max(1, Math.min(action.quantity, line.product.inventory)) }
            : line
        )
      };
    case "clear":
      return { ...state, lines: [] };
    case "drawer":
      return { ...state, drawerOpen: action.open };
    case "wishlist": {
      const exists = state.wishlist.some((item) => item.id === action.product.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((item) => item.id !== action.product.id)
          : [...state.wishlist, action.product]
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const lines = window.localStorage.getItem("pfv_cart");
    const wishlist = window.localStorage.getItem("pfv_wishlist");

    dispatch({
      type: "hydrate",
      payload: {
        lines: lines ? (JSON.parse(lines) as CartLine[]) : [],
        wishlist: wishlist ? (JSON.parse(wishlist) as Product[]) : []
      }
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("pfv_cart", JSON.stringify(state.lines));
  }, [state.lines]);

  useEffect(() => {
    window.localStorage.setItem("pfv_wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "add", product, quantity });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "remove", productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "quantity", productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const openDrawer = useCallback(() => {
    dispatch({ type: "drawer", open: true });
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch({ type: "drawer", open: false });
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    dispatch({ type: "wishlist", product });
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => state.wishlist.some((product) => product.id === productId),
    [state.wishlist]
  );

  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.lines.reduce((total, line) => total + line.product.price * line.quantity, 0);
    const lineCount = state.lines.reduce((total, line) => total + line.quantity, 0);

    return {
      ...state,
      subtotal,
      lineCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openDrawer,
      closeDrawer,
      toggleWishlist,
      isWishlisted
    };
  }, [addItem, clearCart, closeDrawer, isWishlisted, openDrawer, removeItem, state, toggleWishlist, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
