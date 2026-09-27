"use client";

import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import {
  obtenerDetalleCompleto,
  obtenerIdPokemon,
  obtenerImagenPokemon,
} from "@/lib/pokemon";

import { pokemonKeys } from "@/lib/queryKeys";
import type { PokemonResumen } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonResumen;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const queryClient = useQueryClient();

  const id = obtenerIdPokemon(pokemon.url);
  const imagen = obtenerImagenPokemon(id);

  const precargarPokemon = () => {
    queryClient.prefetchQuery({
      queryKey: pokemonKeys.detalle(pokemon.name),
      queryFn: () => obtenerDetalleCompleto(pokemon.name),
    });
  };

  return (
    <Link href={`/pokemon/${pokemon.name}`} onMouseEnter={precargarPokemon}>
      <article className="rounded-xl border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="relative mx-auto h-40 w-40">
          <Image
            src={imagen}
            alt={pokemon.name}
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>

        <p className="mt-2 text-center text-sm text-gray-500">#{id}</p>

        <h2 className="text-center text-lg font-semibold capitalize">
          {pokemon.name}
        </h2>
      </article>
    </Link>
  );
}
