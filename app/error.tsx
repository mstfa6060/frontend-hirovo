"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 flex items-center justify-center px-4 gradient-bg">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Bir hata olustu</h1>
        <p className="text-white/70 mb-8">
          {error.message || "Beklenmeyen bir hata meydana geldi."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    </main>
  );
}
