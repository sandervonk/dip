"use client";
import React from "react";
import { pages } from "../app/constants";

export default function Home() {
  return (
    <React.Fragment>
      {pages.map((page, i) => {
        const Component = page.component;
        return Component && <Component key={i} data={page.data} />;
      })}
      <div style={{ height: 10000 }}>scroll me</div>
    </React.Fragment>
  );
}
