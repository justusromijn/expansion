import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/game/index.js",
  output: {
    file: "dist/game.js",
    format: "iife",
  },
  plugins: [nodeResolve(), serve("dist"), terser()],
};
