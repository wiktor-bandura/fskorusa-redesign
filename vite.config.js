import Inspect from "vite-plugin-inspect";
import Sitemap from 'vite-plugin-sitemap';
import { resolve } from "path";

export default {
  base: "",
  plugins: [Inspect(),Sitemap({ hostname: "https://www.fskorusa.archidiecezja.wroc.pl/" })],
  build: {
    assetsDir: "assets",
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        galeria: resolve(__dirname, "galeria/index.html"),
        wspomnienia: resolve(__dirname, "wspomnienia/index.html"),
        pamiatki: resolve(__dirname, "pamiatki/index.html"),
        zyciorys: resolve(__dirname, "zyciorys/index.html"),
      },
    },
  },
};
