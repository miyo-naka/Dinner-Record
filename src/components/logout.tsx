"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const token = document.cookie.replace("__session=", "");

    await fetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    });

    document.cookie =
      "__session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

    router.push("/auth/login"); // ログインページにリダイレクト
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
