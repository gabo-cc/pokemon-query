export interface PokemonResumen {
  name: string;
  url: string;
}

export interface PokemonListaRespuesta {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResumen[];
}

export interface PokemonTipo {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonHabilidad {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonDetalle {
  id: number;
  name: string;
  height: number;
  weight: number;

  types: PokemonTipo[];
  abilities: PokemonHabilidad[];
  stats: PokemonStat[];

  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;

    other: {
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };

  species: {
    name: string;
    url: string;
  };
}

export interface PokemonEspecie {
  evolution_chain: {
    url: string;
  };
}

export interface NodoEvolucion {
  species: {
    name: string;
    url: string;
  };
  evolves_to: NodoEvolucion[];
}

export interface CadenaEvolucion {
  chain: NodoEvolucion;
}

export interface PokemonDetalleCompleto {
  pokemon: PokemonDetalle;
  evoluciones: string[];
}
