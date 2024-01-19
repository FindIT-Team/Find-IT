import { NextFont } from 'next/dist/compiled/@next/font';
import { IBM_Plex_Mono, Inter } from 'next/font/google';

export const inter: NextFont = Inter({
  subsets: ['cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});
export const ibmPlexMono: NextFont = IBM_Plex_Mono({
  preload: true,
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});
