import Link from "next/link";
import LogoutButton from "./logout";

export default function Header() {
  return (
    <div className="flex">
      <Link
        href="/"
        className="flex h-[30px] text-xl font-bold tracking-wide absolute top-0 left-0 p-4"
      >
        <img src="わたしのごはんロゴ.png" className="h-[30px] mr-2" />
        わたしのごはん
      </Link>

      <Link href="/mypage">
        <button className="absolute top-0 right-[120px] m-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-200">
          Mypage
        </button>
      </Link>
      <LogoutButton />
    </div>
  );
}
