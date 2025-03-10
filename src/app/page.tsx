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
      <Earth
        initialPanning={{ x: 0, y: 0 }}
        initialPosition={{ x: 4.5, y: 2, z: 3 }}
        initialRotation={{ x: 0, y: 0, z: 0 }}
        sunPosition={{ x: 0, y: 0, z: 3 }}
        autoRotate={false}
      />
      <div style={{ height: 10000 }}>scroll me</div>
    </React.Fragment>
  );
}
