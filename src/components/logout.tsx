"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";

export default function LogoutButton() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return user ? <button onClick={handleLogout}>ログアウト</button> : null;
}
