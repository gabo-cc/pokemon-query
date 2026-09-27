"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { obtenerDetalleCompleto } from "@/lib/pokemon";
import { pokemonKeys } from "@/lib/queryKeys";

interface PokemonDetailProps {
  nombre: string;
}

export default function PokemonDetail({ nombre }: PokemonDetailProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: pokemonKeys.detalle(nombre),
    queryFn: () => obtenerDetalleCompleto(nombre),
  });

  if (isPending) {
    return <p className="p-8 text-center">Cargando Pokémon...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-center text-red-500">
        No se pudo cargar el Pokémon.
      </p>
    );
  }

  const { pokemon, evoluciones } = data;

  const imagen = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <main className="mx-auto w-full max-w-5xl p-8">
      <Link
        href="/"
        className="mb-8 inline-block font-semibold hover:underline"
      >
        ← Volver a la Pokédex
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border p-6 shadow-sm">
          <p className="text-gray-500">#{pokemon.id}</p>

          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>

          {imagen && (
            <div className="relative mx-auto mt-6 h-72 w-72">
              <Image
                src={imagen}
                alt={pokemon.name}
                fill
                sizes="288px"
                className="object-contain"
                priority
              />
            </div>
          )}

          <div className="mt-6 flex gap-6">
            <p>
              <strong>Altura:</strong> {pokemon.height / 10} m
            </p>

            <p>
              <strong>Peso:</strong> {pokemon.weight / 10} kg
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold">Tipos</h2>

            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((tipo) => (
                <span
                  key={tipo.type.name}
                  className="rounded-full bg-orange-100 px-4 py-2 font-medium text-orange-900 capitalize"
                >
                  {tipo.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold">Habilidades</h2>

            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((habilidad) => (
                <span
                  key={habilidad.ability.name}
                  className="rounded-full bg-orange-100 px-4 py-2 font-medium text-orange-900 capitalize"
                >
                  {habilidad.ability.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-bold">Estadísticas</h2>

        <div className="space-y-4">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name}>
              <div className="mb-1 flex justify-between">
                <span className="capitalize">{stat.stat.name}</span>

                <span className="font-semibold">{stat.base_stat}</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-orange-400"
                  style={{
                    width: `${Math.min(stat.base_stat / 2, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-bold">Cadena evolutiva</h2>

        <div className="flex flex-wrap items-center gap-3">
          {evoluciones.map((evolucion, index) => (
            <div key={evolucion} className="flex items-center gap-3">
              <Link
                href={`/pokemon/${evolucion}`}
                className="rounded-full bg-orange-100 px-4 py-2 font-semibold capitalize hover:bg-orange-200"
              >
                {evolucion}
              </Link>

              {index < evoluciones.length - 1 && <span>→</span>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
