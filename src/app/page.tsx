"use client";
import React from "react";
import { pages } from "@/app/constants";
import Earth from "@/components/Earth";

export default function Home() {
  return (
    <React.Fragment>
      {pages.map((page, i) => {
        const Component = page.component;

        // @ts-expect-error data content varies by page
        return Component && <Component key={i} data={page.data} />;
      })}
      <div style={{ zIndex: -1 }}>
        <Earth
          initialPanning={{ x: 0, y: 1.25 }}
          initialPosition={{ x: 0.5, y: 0, z: 2 }}
          initialRotation={{ x: 0, y: 0, z: 0 }}
          sunPosition={{ x: 1, y: 2, z: 2 }}
          autoRotate={false}
        />
      </div>
      <div style={{ height: 10000 }}>scroll me</div>
    </React.Fragment>
  );
}
