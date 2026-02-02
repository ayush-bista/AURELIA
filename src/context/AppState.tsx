import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { Product } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
 

type AuthProvider = "email" | "google" | "apple";

type User = {
  id: string;
  email?: string;
  fullName?: string;
  provider: AuthProvider;
};

type CartItem = {
  productId: string;
  quantity: number;
};

type AppStateValue = {
  user: User | null;
  loginEmail: (email: string, password: string) => Promise<void>;
  signupEmail: (email: string, password: string, fullName: string) => Promise<void>;
  loginWithProvider: (provider: AuthProvider) => void;
  logout: () => void;
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  requireAuth: (navigate?: ReturnType<typeof useNavigate>, redirectPath?: string) => boolean;
  orders: { id: string; items: CartItem[]; created_at: string }[];
  placeOrder: () => void;
};

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

const storageKey = (userId: string | null, key: string) => {
  const id = userId || "guest";
  return `aurelia:${id}:${key}`;
};

const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("aurelia:user");
    return raw ? JSON.parse(raw) : null;
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const raw = localStorage.getItem(storageKey(user?.id || null, "wishlist"));
    return raw ? JSON.parse(raw) : [];
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem(storageKey(user?.id || null, "cart"));
    return raw ? JSON.parse(raw) : [];
  });
  const [orders, setOrders] = useState<{ id: string; items: CartItem[]; created_at: string }[]>(() => {
    const raw = localStorage.getItem(storageKey(user?.id || null, "orders"));
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("aurelia:user", JSON.stringify(user));
    const wl = localStorage.getItem(storageKey(user?.id || null, "wishlist"));
    const ct = localStorage.getItem(storageKey(user?.id || null, "cart"));
    setWishlist(wl ? JSON.parse(wl) : []);
    setCart(ct ? JSON.parse(ct) : []);
  }, [user?.id]);

  useEffect(() => {
    localStorage.setItem(storageKey(user?.id || null, "wishlist"), JSON.stringify(wishlist));
  }, [user?.id, wishlist]);

  useEffect(() => {
    localStorage.setItem(storageKey(user?.id || null, "cart"), JSON.stringify(cart));
  }, [user?.id, cart]);

  useEffect(() => {
    const od = localStorage.getItem(storageKey(user?.id || null, "orders"));
    setOrders(od ? JSON.parse(od) : []);
  }, [user?.id]);
  useEffect(() => {
    localStorage.setItem(storageKey(user?.id || null, "orders"), JSON.stringify(orders));
  }, [user?.id, orders]);

 

  const loginEmail = async (email: string, password: string) => {
    const data = await api.auth.login(email, password);
    const u: User = { id: data.user.id, email: data.user.email, fullName: data.user.fullName, provider: "email" };
    setUser(u);
    toast.success("Signed in");
  };

  const signupEmail = async (email: string, password: string, fullName: string) => {
    const data = await api.auth.signup(email, password, fullName);
    const u: User = { id: data.user.id, email: data.user.email, fullName: data.user.fullName, provider: "email" };
    setUser(u);
    toast.success("Account created");
  };

  const loginWithProvider = (provider: AuthProvider) => {
    const id = crypto.randomUUID();
    const u: User = { id, provider };
    setUser(u);
    toast.success(`Signed in with ${provider}`);
  };

  const logout = () => {
    setUser(null);
    toast.success("Signed out");
  };

  const toggleWishlist = (product: Product) => {
    if (!user) {
      toast.error("Please sign in to use wishlist");
      return;
    }
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!user) {
      toast.error("Please sign in to add to bag");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { productId: product.id, quantity }];
    });
    toast.success("Added to bag");
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };
  const placeOrder = () => {
    if (!user) {
      toast.error("Please sign in to place order");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your bag is empty");
      return;
    }
    // Generate a real-life looking order ID (e.g., ORD-123456)
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const order = { id: orderId, items: cart, created_at: new Date().toISOString() };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    toast.success("Order placed");
  };

  const requireAuth: AppStateValue["requireAuth"] = (navigate, redirectPath = "/account") => {
    if (user) return true;
    toast.error("Please sign in to continue");
    if (navigate) navigate(redirectPath);
    return false;
  };

  const value = useMemo<AppStateValue>(
    () => ({
      user,
      loginEmail,
      signupEmail,
      loginWithProvider,
      logout,
      wishlist,
      toggleWishlist,
      isWishlisted,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      requireAuth,
      orders,
      placeOrder,
    }),
    [user, wishlist, cart, orders]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
};

export { AppStateProvider, useAppState };
