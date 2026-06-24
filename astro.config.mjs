// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://senoramadhani.my.id",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    svelte(),
    mdx(),
    partytown({ config: { forward: ["umami.track"] } }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "github-dark",
        light: "github-light",
      },
      defaultColor: false,
      wrap: true,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Fira Code",
      cssVariable: "--font-fira-code",
      fallbacks: ["monospace"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      noExternal: ["@hugeicons/svelte"],
    },
  },
});
