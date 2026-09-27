import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PokemonList from "@/components/PokemonList";
import { obtenerPokemones } from "@/lib/pokemon";
import { crearQueryClient } from "@/lib/queryClient";
import { pokemonKeys } from "@/lib/queryKeys";

export default async function Home() {
  const queryClient = crearQueryClient();

  await queryClient.prefetchQuery({
    queryKey: pokemonKeys.lista(50, 0),
    queryFn: () => obtenerPokemones(50, 0),
  });

  return (
    <main className="mx-auto w-full max-w-6xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Pokédex</h1>

        <p className="mt-2 text-gray-600">Explora los primeros 50 Pokémon.</p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonList />
      </HydrationBoundary>
    </main>
  );
}
