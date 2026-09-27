"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Algo salió mal</h2>

        <p className="mt-2 text-gray-600">
          No se pudo cargar la información de los Pokémon.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600"
        >
          Intentar de nuevo
        </button>
      </div>
    </main>
  );
}
