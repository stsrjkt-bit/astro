import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'HOME',
      href: getPermalink('/'),
    },
    {
      text: '数学が苦手な高校生へ',
      href: getPermalink('/math-nigate'),
    },
    {
      text: '理系大学をめざすあなたへ',
      href: getPermalink('/rikei'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `
    © 2016-2025 さとう数理塾
  `,
};
