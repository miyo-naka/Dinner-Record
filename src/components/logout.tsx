"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return user ? (
    <button
      onClick={handleLogout}
      className="absolute top-0 right-0 m-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
    >
      ログアウト
    </button>
  ) : null;
}
