"use client";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // サーバーにIDトークンを送信
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Authentication failed");
      }

      // トークンをCookieに保存
      document.cookie = `__session=${token}; path=/;`;

      // ログイン成功後の処理
      window.location.href = "/dashboard"; // ダッシュボードにリダイレクト
    } catch (error) {
      setError("ログインに失敗しました");
    }
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <h2>ログイン</h2>
      <div className="mt-8 md:w-1/3">
        <form onSubmit={handleSubmit}>
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
            type="submit"
            className="w-4/5 m-4 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200"
          >
            ログイン
          </button>
        </form>
        {error && <p>{error}</p>}
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
