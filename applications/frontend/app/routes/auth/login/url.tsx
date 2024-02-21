export const externalAuth = [
  {
    id: 'Apple',
    url: `api.${process.env.DOMAIN}/auth/oauth/apple-auth`,
    img: '/icons/auth/apple.svg',
  },
  {
    id: 'Google',
    url: `api.${process.env.DOMAIN}/auth/oauth/google-auth`,
    img: '/icons/auth/google.svg',
  },
  {
    id: 'Yandex',
    url: `api.${process.env.DOMAIN}/auth/oauth/yandex-auth`,
    img: '/icons/auth/yandex.svg',
  },
  {
    id: 'Github',
    url: `api.${process.env.DOMAIN}/auth/oauth/github-auth`,
    img: '/icons/auth/github.svg',
  },
];
