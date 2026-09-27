import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import PokemonDetail from "@/components/PokemonDetail";
import { obtenerDetalleCompleto } from "@/lib/pokemon";
import { crearQueryClient } from "@/lib/queryClient";
import { pokemonKeys } from "@/lib/queryKeys";

interface PokemonPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;

  const queryClient = crearQueryClient();

  await queryClient.prefetchQuery({
    queryKey: pokemonKeys.detalle(name),
    queryFn: () => obtenerDetalleCompleto(name),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetail nombre={name} />
    </HydrationBoundary>
  );
}
