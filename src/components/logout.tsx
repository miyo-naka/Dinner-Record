"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });

      router.refresh();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-0 right-0 m-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-200"
    >
      ログアウト
    </button>
  );
}
