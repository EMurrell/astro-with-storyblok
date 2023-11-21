import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
// add this for visual editor to work in dev mode:
import basicSsl from "@vitejs/plugin-basic-ssl";

const env = loadEnv("", process.cwd(), "STORYBLOK");
// Since the Astro config file does not normally support environment variables, use the loadEnv function from Vite to load them.

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // add this for visual editor to work in dev mode:
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  integrations: [
    tailwind(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        // Add your components here. The component paths are relative to the src directory. For example, if your component is located at src/storyblok/MyComponent.astro, the path would be storyblok/MyComponent (without the .astro extension).
        blogPost: "storyblok/BlogPost",
        blogPostList: "storyblok/BlogPostList",
        page: "storyblok/Page",
      },

      apiOptions: {
        // Choose your Storyblok space region
        region: "us", // optional,  or 'eu' (default)
      },
    }),
  ],
});

