export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl p-8">
      <div className="mb-8">
        <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-xl border p-4">
            <div className="mx-auto h-40 w-40 rounded-xl bg-gray-200" />
            <div className="mx-auto mt-4 h-4 w-12 rounded bg-gray-200" />
            <div className="mx-auto mt-3 h-5 w-24 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
