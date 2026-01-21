// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Introduction to BBj Development',
  tagline: 'Learn BBj programming from the ground up',
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://BasisHub.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/BBj-Beginner-Course/',

  // GitHub pages deployment config.
  organizationName: 'BasisHub', // Usually your GitHub org/user name.
  projectName: 'BBj-Beginner-Course', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve docs at the site's root
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'BBj Beginner Tutorial',
        logo: {
          alt: 'BBj Logo',
          src: 'img/logo.png',
          href: '/',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/bbjobjects.htm',
            label: 'BBj Documentation',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Course',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'Getting Started',
                to: '/getting-started',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'BASIS Online Help',
                href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm',
              },
              {
                label: 'DWC Documentation',
                href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/dwc/DWC_Overview.htm',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BASIS International Ltd. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java'],
      },
    }),
};

export default config;
