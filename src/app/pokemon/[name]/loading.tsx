export default function LoadingPokemon() {
  return (
    <main className="mx-auto w-full max-w-5xl p-8">
      <div className="mb-8 h-5 w-40 animate-pulse rounded bg-gray-200" />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="animate-pulse rounded-2xl border p-6">
          <div className="h-5 w-12 rounded bg-gray-200" />

          <div className="mt-3 h-10 w-40 rounded bg-gray-200" />

          <div className="mx-auto mt-6 h-72 w-72 rounded-2xl bg-gray-200" />
        </div>

        <div className="space-y-6">
          <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />

          <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}