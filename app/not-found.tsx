import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold text-graphite">404</h1>
      <p className="mb-6 text-gray-600">Страница не найдена</p>
      <Link href="/" className="btn-primary">
        На главную
      </Link>
    </div>
  );
}
