import { defineConfig } from "vite";
import { VitePluginFonts } from "vite-plugin-fonts";

export default defineConfig({
  plugins: [
    VitePluginFonts({
      google: {
        families: ["Nunito"],
      },
    }),
  ],
  build: {
    target: "esnext",
    sourcemap: true,
  },
});
