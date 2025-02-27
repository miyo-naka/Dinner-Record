import Link from "next/link";

export default function thanks() {
  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen">
      <h2>ご登録ありがとうございます</h2>
      <Link
        href="/auth/login"
        className="m-4 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200"
      >
        ログイン画面へ
      </Link>
    </div>
  );
}
