// @ts-check

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'introduction/index',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'getting-started/index',
      label: 'Set Up your Environment and Get Started',
    },
    {
      type: 'doc',
      id: 'object-oriented/index',
      label: 'Object Oriented Syntax in BBj',
    },
    {
      type: 'doc',
      id: 'file-io/index',
      label: 'File I/O and Data Access',
    },
    {
      type: 'doc',
      id: 'web-development/index',
      label: 'Web Development with BBj\'s DWC',
    },
  ],
};

export default sidebars;
