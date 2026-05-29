/** Staggered 3-row grid matching the original integrations composite (tiles 1–16). */
export const INTEGRATION_TILE_SIZE = 164;

/** Layout at 1:1 scale (6.5rem tiles) — used to fit the grid inside narrow containers. */
export const INTEGRATION_TILE_DISPLAY_PX = 104;
export const INTEGRATION_TILE_GAP_PX = 20;
export const INTEGRATION_ROW_GAP_PX = 16;
export const INTEGRATIONS_GRID_DESIGN_WIDTH =
  6 * INTEGRATION_TILE_DISPLAY_PX + 5 * INTEGRATION_TILE_GAP_PX;
export const INTEGRATIONS_GRID_DESIGN_HEIGHT =
  3 * INTEGRATION_TILE_DISPLAY_PX + 2 * INTEGRATION_ROW_GAP_PX;

type IntegrationTileRow = {
  tiles: readonly number[];
  opacityClass: readonly string[];
};

export const INTEGRATION_TILE_ROWS: readonly IntegrationTileRow[] = [
  {
    tiles: [1, 2, 3, 4, 5],
    opacityClass: ["opacity-30", "opacity-100", "opacity-100", "opacity-100", "opacity-30"],
  },
  {
    tiles: [6, 7, 8, 9, 10, 11],
    opacityClass: [
      "opacity-10",
      "opacity-80",
      "opacity-100",
      "opacity-100",
      "opacity-80",
      "opacity-10",
    ],
  },
  {
    tiles: [12, 13, 14, 15, 16],
    opacityClass: ["opacity-30", "opacity-100", "opacity-100", "opacity-100", "opacity-30"],
  },
];

export function integrationTileSrc(id: number) {
  return `/integrations/tile-${id}.png`;
}
