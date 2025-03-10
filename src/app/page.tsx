"use client";
import React from "react";
import { pages } from "@/app/constants";
import EarthScene from "@/components/Earth";

export default function Home() {
  return (
    <React.Fragment>
      {pages.map((page, i) => {
        const Component = page.component;

        // @ts-expect-error data content varies by page
        return Component && <Component key={i} data={page.data} />;
      })}
      <EarthScene />
      <div style={{ height: 10000 }}>scroll me</div>
    </React.Fragment>
  );
}
