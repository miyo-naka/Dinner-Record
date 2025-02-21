import Link from "next/link";

export default function Home() {
  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <h1 className="text-5xl font-bold tracking-wide">わたしのごはん</h1>
      <div>
        <Link href="/record">
          <button className="mt-8 mx-4 py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200">
            記録する
          </button>
        </Link>
        <Link href="/history">
          <button className="mt-8 mx-4 py-3 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200">
            今までのごはん
          </button>
        </Link>
      </div>
    </div>
  );
}
