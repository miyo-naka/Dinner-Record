"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { deleteCookie, setCookie } from "cookies-next";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        //ログイン時にトークンを取得してクッキーにセット
        const token = await user.getIdToken();
        setCookie("__session", token);
      } else {
        deleteCookie("__session");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
