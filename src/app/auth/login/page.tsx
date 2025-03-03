"use client";
import { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit initiated");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      console.log("Server response:", res);
      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok || !data.token) {
        throw new Error("Authentication failed");
      }
      // 受け取ったカスタムトークンを Cookie に保存
      document.cookie = `__session=${data.token}; path=/;`;
      console.log("Token saved in cookie");

      // const auth = getAuth();
      // console.log("Auth initialized:", auth);
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // console.log("User credential:", userCredential);
      // const user = userCredential.user;
      // console.log("User:", user);
      // const token = await user.getIdToken();
      // console.log("Token:", token);

      // サーバーにIDトークンを送信
      // const res = await fetch("/api/auth/verify", {
      //   method: "POST",
      //   body: JSON.stringify({ idToken: token }),
      //   headers: { "Content-Type": "application/json" },
      // });
      // console.log("Server response:", res);
      // if (!res.ok) {
      //   throw new Error("Authentication failed");
      // }

      // トークンをCookieに保存
      // document.cookie = `__session=${token}; path=/;`;
      // console.log("Token saved in cookie");

      // ログイン成功後の処理
      window.location.href = "/"; // ダッシュボードにリダイレクト
    } catch (error: any) {
      console.error("Login error:", error.message);
      setError("ログインに失敗しました");
    }
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <h2>ログイン</h2>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col md:w-1/3 mt-8">
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
        アカウントをお持ちでない場合
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
