export const pokemonKeys = {
  lista: (limite: number, offset: number) =>
    ["pokemon", "lista", limite, offset] as const,

  detalle: (nombre: string) => ["pokemon", "detalle", nombre] as const,
};
