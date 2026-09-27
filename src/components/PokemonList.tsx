"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import PokemonCard from "@/components/PokemonCard";
import { obtenerPokemones } from "@/lib/pokemon";
import { pokemonKeys } from "@/lib/queryKeys";

const LIMITE = 50;

export default function PokemonList() {
  const [pagina, setPagina] = useState(0);

  const offset = pagina * LIMITE;

  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: pokemonKeys.lista(LIMITE, offset),
    queryFn: () => obtenerPokemones(LIMITE, offset),

    // Mantiene los Pokémon anteriores mientras carga la nueva página
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <p className="text-center">Cargando Pokémon...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        No se pudieron cargar los Pokémon.
      </p>
    );
  }

  const totalPaginas = Math.ceil(data.count / LIMITE);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {data.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPagina((actual) => Math.max(actual - 1, 0))}
          disabled={pagina === 0 || isFetching}
          className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="font-medium">
          Página {pagina + 1} de {totalPaginas}
        </span>

        <button
          type="button"
          onClick={() => setPagina((actual) => actual + 1)}
          disabled={data.next === null || isFetching}
          className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {isFetching && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Cargando página...
        </p>
      )}
    </>
  );
}
