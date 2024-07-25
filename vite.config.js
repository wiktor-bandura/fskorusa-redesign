import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

export default {
  plugins: [Inspect()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        galeria: resolve(__dirname, "galeria/index.html"),
        wspomnienia: resolve(__dirname, "wspomnienia/index.html"),
        pamiatki: resolve(__dirname, "pamiatki/index.html"),
      },
    },
  },
};
