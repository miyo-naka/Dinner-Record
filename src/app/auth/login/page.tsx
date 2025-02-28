"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // ログイン後のページ
    } catch (error) {
      alert("ログインに失敗しました");
    }
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <h2>ログイン</h2>
      <div className="mt-8 md:w-1/3">
        <label className="flex justify-between items-center my-1 ">
          E-mail
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ml-4 p-2 border rounded-lg  w-3/4"
          />
        </label>
        <label className="flex justify-between items-center my-1">
          Password
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="ml-4 p-2 border rounded-lg  w-3/4"
          />
        </label>
        <button
          onClick={handleLogin}
          className="w-4/5 m-4 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200"
        >
          ログイン
        </button>
      </div>
      <p className="mt-8">
        アカウントをお持ちでない場合{" "}
        <Link
          href="/auth/register"
          className="m-4 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200"
        >
          登録
        </Link>
      </p>
    </div>
  );
}
