import { defineConfig } from 'vitepress';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'VitePress',
  description: 'Vite & Vue powered static site generator.',
  srcDir: "notes",

  themeConfig: {
    nav: [
      { text: 'Flask', link: 'Flask' },
      {
        text: 'uni-app',
        items: [
          { text: 'uni-app 简介', link: './Uniapp/uni-app 简介' },
          { text: 'uni-app 副本', link: 'Uniapp - 副本' },
        ],
      },

    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Example', link: 'Flask' },
        ],
      },
    ],
  },
});
