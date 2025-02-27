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
      <LogoutButton />
    </div>
  );
}
