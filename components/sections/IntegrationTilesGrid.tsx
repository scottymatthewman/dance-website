"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  INTEGRATION_ROW_GAP_PX,
  INTEGRATION_TILE_DISPLAY_PX,
  INTEGRATION_TILE_GAP_PX,
  INTEGRATION_TILE_ROWS,
  INTEGRATION_TILE_SIZE,
  INTEGRATIONS_GRID_DESIGN_HEIGHT,
  INTEGRATIONS_GRID_DESIGN_WIDTH,
  integrationTileSrc,
} from "@/lib/integrations-tiles";

const GRID_LABEL =
  "Integration partners including Slack, Gmail, HubSpot, Salesforce, Zoom, and more";

export function IntegrationTilesGrid() {
  const measureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = measureRef.current;
    if (!element) return;

    const updateScale = () => {
      const width = element.getBoundingClientRect().width;
      setScale(Math.min(1, width / INTEGRATIONS_GRID_DESIGN_WIDTH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={measureRef} className="w-full max-w-[50rem]">
      <div
        className="relative mx-auto w-full"
        style={{ height: INTEGRATIONS_GRID_DESIGN_HEIGHT * scale }}
      >
        <figure
          aria-label={GRID_LABEL}
          className="absolute left-1/2 top-0 flex flex-col items-center"
          style={{
            width: INTEGRATIONS_GRID_DESIGN_WIDTH,
            gap: INTEGRATION_ROW_GAP_PX,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {INTEGRATION_TILE_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center"
              style={{ gap: INTEGRATION_TILE_GAP_PX }}
            >
              {row.tiles.map((tileId, columnIndex) => (
                <Image
                  key={tileId}
                  alt=""
                  aria-hidden
                  className={cn(
                    "shrink-0",
                    row.opacityClass[columnIndex],
                  )}
                  height={INTEGRATION_TILE_DISPLAY_PX}
                  src={integrationTileSrc(tileId)}
                  width={INTEGRATION_TILE_DISPLAY_PX}
                />
              ))}
            </div>
          ))}
        </figure>
      </div>
    </div>
  );
}
