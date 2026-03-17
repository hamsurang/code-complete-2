import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Code Complete 2판 한글 스터디',
  tagline: '함수랑 동아리 — Code Complete 2nd Edition 함께 읽기',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://hamsurang.github.io',
  baseUrl: '/code-complete/',

  organizationName: 'hamsurang',
  projectName: 'code-complete',

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
          editUrl: 'https://github.com/hamsurang/code-complete/tree/main/',
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
          href: 'https://github.com/hamsurang/code-complete',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '문서',
          items: [
            {
              label: '목차',
              to: '/',
            },
          ],
        },
        {
          title: '함수랑',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/hamsurang',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 함수랑. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
