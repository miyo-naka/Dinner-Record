"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";

export default function mypage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <Header />
      <h2 className="mt-20 my-8"> Mypage</h2>
      {user && (
        <>
          <table className="border-separate border-spacing-2">
            <tbody>
              <tr>
                <th>名前</th>
                <td className="ml-4 p-2 bg-gray-100 rounded-lg">
                  {user.displayName}
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td className="ml-4 p-2 bg-gray-100 rounded-lg">
                  {user.email}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <Link href="/">
        <button className="mt-8 mx-4 py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200">
          ホームに戻る
        </button>
      </Link>
    </div>
  );
}
