import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
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
