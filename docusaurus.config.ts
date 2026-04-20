import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Code Complete 2판 한글 스터디',
  tagline: 'FE 개발자 7명이 Code Complete 2판을 읽고, 2026년에도 살아있는지 직접 투표했어요',
  favicon: 'img/favicon.jpeg',

  future: {
    v4: true,
  },

  url: 'https://hamsurang.github.io',
  baseUrl: '/code-complete-2/',

  organizationName: 'hamsurang',
  projectName: 'code-complete-2',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/hamsurang/code-complete-2/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Code Complete 2판',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bookSidebar',
          position: 'left',
          label: '목차',
        },
        {
          href: 'https://github.com/hamsurang/code-complete-2',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
