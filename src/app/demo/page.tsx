"use client";
import { ColorText } from "../constants";

export default function Demo() {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        style={{ border: "none", width: "100%", height: "calc(100vh - 50px)" }}
        width="800"
        height="450"
        src="https://embed.figma.com/proto/zcjPb1fZGgZ505ekk0Tina/Xhacks-Dip-2025?page-id=0%3A1&node-id=35-147&viewport=-1577%2C-309%2C0.23&scaling=scale-down&content-scaling=responsive&starting-point-node-id=42%3A4932&show-proto-sidebar=0&embed-host=share&hide-ui=1"
        allowFullScreen
      ></iframe>
      <p
        style={{
          textAlign: "center",
          paddingBottom: 30,
          fontSize: "0.8em",
          maxWidth: 650,
        }}
      >
        {ColorText(
          `*Double tap* **R** while the preview is selected to restart the applet;
          <br>*Blue outlines* that appear briefly on click show **clickable elements**
          <br>An early design of DIP is also *avaliable to try* on <a href="https://www.figma.com/proto/zcjPb1fZGgZ505ekk0Tina/Xhacks-Dip-2025?page-id=0%3A1&node-id=42-4932&t=xsSCJgln1gIb49LW-0&scaling=scale-down&content-scaling=responsive&starting-point-node-id=42%3A4932&show-proto-sidebar=0&hide-ui=1" target="blank">**Figma**</a>`,
          true,
          true
        )}
      </p>
    </div>
  );
}
