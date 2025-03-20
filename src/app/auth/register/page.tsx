"use client";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      // console.log("ユーザー登録成功", Credential);
      router.push("/auth/thanks"); // 登録成功後の遷移ページ
    } catch (err: any) {
      console.error("登録に失敗しました：", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <h2>新規登録</h2>
      <form className="flex flex-col md:w-1/3 mt-8">
        <label className="flex justify-between items-center my-1">
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
          onClick={handleRegister}
          className="m-4 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200"
        >
          登録
        </button>
      </form>
      <p className="mt-8">
        すでにアカウントをお持ちの場合{" "}
        <Link
          href="/auth/login"
          className="m-4 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200"
        >
          ログイン
        </Link>
      </p>
    </div>
  );
}
