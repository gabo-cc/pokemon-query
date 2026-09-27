# Pokédex con TanStack Query

Aplicación desarrollada con Next.js, TypeScript, TanStack Query, Tailwind CSS y PokéAPI.

## Funcionalidades

- Listado y paginación de Pokémon.
- Información detallada de cada Pokémon.
- Precarga de datos con `prefetchQuery`.
- Hidratación con `HydrationBoundary` y `dehydrate`.
- Manejo de carga y errores.

## Estrategia de caché

Se utiliza `staleTime` de 24 horas y `gcTime` para reutilizar datos almacenados en caché. Además, `keepPreviousData` mantiene los datos visibles durante la paginación.

## Ejecución

```bash
pnpm install
pnpm dev
```
