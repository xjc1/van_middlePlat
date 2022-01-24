import { addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import 'antd/dist/antd.css';

addParameters({
  options: {
    theme: create({
      brandTitle: 'TIS_UI 组件库',
    }),
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
