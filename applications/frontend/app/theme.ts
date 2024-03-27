import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const themeConfig: ThemeConfig = {};

export const theme = extendTheme(
  {
    colors: {
      indigo: {
        600: 'rgb(79 70 229)',
        700: 'rgb(67 56 202)',
        950: 'rgb(30 27 75)',
      },
      green: {
        500: 'rgb(34 197 94)',
        600: 'rgb(22 163 74)',
      },
      purple: {
        600: 'rgb(147 51 234)',
        700: 'rgb(126 34 206)',
      },
    },
    components: {
      Button: {
        baseStyle: {
          _disabled: {
            cursor: 'default',
          },
        },
      },
    },
  },
  themeConfig,
);
