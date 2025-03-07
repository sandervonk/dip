"use client";
import { pages } from "../app/constants";

export default function Home() {
  return (
    <>
      {pages.map((page, i) => {
        const Component = page.component;
        return Component && <Component key={i} data={page.data} />;
      })}
      <div style={{ height: 10000 }}>scroll me</div>
    </>
  );
}
