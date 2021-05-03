import { createHexPrototype, Grid, rectangle } from "honeycomb-grid";
import { SVG } from "@svgdotjs/svg.js";

const hexPrototype = createHexPrototype({ dimensions: 30, origin: "topLeft" });

const draw = SVG().addTo("body").size("100%", "100%");

function renderSVG(hex) {
  const polygon = draw
    // create a polygon from a hex's corner points
    .polygon(hex.corners.map(({ x, y }) => `${x},${y}`))
    .fill(hex.color || "#606060")
    .stroke({ width: 1, color: "#999" });

  return draw.group().add(polygon);
}

let grid = new Grid(
  hexPrototype,
  rectangle({ start: [0, 0], width: 10, height: 10 })
)
  .each(renderSVG)
  .run();

document.addEventListener("click", (evt) => {
  const hex = grid.pointToHex({ x: evt.offsetX, y: evt.offsetY });
  hex.color = "#f9f9f9";
  console.log("hex", hex);
  grid = grid.update((grid) => {
    grid.store.set(hex.toString(), hex);
  });
  grid.each(renderSVG).run();
});
