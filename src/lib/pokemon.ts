import type {
  CadenaEvolucion,
  NodoEvolucion,
  PokemonDetalle,
  PokemonDetalleCompleto,
  PokemonEspecie,
  PokemonListaRespuesta,
} from "@/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export async function obtenerPokemones(
  limite = 50,
  offset = 0,
): Promise<PokemonListaRespuesta> {
  const respuesta = await fetch(
    `${API_URL}/pokemon?limit=${limite}&offset=${offset}`,
  );

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los Pokémon");
  }

  return respuesta.json();
}

export function obtenerIdPokemon(url: string): string {
  const partes = url.split("/").filter(Boolean);

  return partes[partes.length - 1];
}

export function obtenerImagenPokemon(id: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function obtenerPokemon(nombre: string): Promise<PokemonDetalle> {
  const respuesta = await fetch(`${API_URL}/pokemon/${nombre}`);

  if (!respuesta.ok) {
    throw new Error(`No se pudo obtener el Pokémon ${nombre}`);
  }

  return respuesta.json();
}

async function obtenerEspecie(nombre: string): Promise<PokemonEspecie> {
  const respuesta = await fetch(`${API_URL}/pokemon-species/${nombre}`);

  if (!respuesta.ok) {
    throw new Error(`No se pudo obtener la especie de ${nombre}`);
  }

  return respuesta.json();
}

async function obtenerCadenaEvolucion(url: string): Promise<CadenaEvolucion> {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la cadena evolutiva");
  }

  return respuesta.json();
}

function extraerEvoluciones(nodo: NodoEvolucion): string[] {
  const evoluciones = [nodo.species.name];

  for (const siguiente of nodo.evolves_to) {
    evoluciones.push(...extraerEvoluciones(siguiente));
  }

  return evoluciones;
}

export async function obtenerDetalleCompleto(
  nombre: string,
): Promise<PokemonDetalleCompleto> {
  const pokemon = await obtenerPokemon(nombre);

  const especie = await obtenerEspecie(nombre);

  const cadena = await obtenerCadenaEvolucion(especie.evolution_chain.url);

  const evoluciones = extraerEvoluciones(cadena.chain);

  return {
    pokemon,
    evoluciones,
  };
}
