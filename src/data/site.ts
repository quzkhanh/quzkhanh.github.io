import DeviceMobile from '@phosphor-icons/core/assets/fill/device-mobile-fill.svg';
import PenNib from '@phosphor-icons/core/assets/fill/pen-nib-fill.svg';
import Browser from '@phosphor-icons/core/assets/fill/browser-fill.svg';
import Lightning from '@phosphor-icons/core/assets/fill/lightning-fill.svg';

export const site = {
  name: 'quzkhanh',
  title: 'quzkhanh, mobile & web developer',
  description: 'Mobile and web developer. I build apps, websites and automation solo, from first screen to release.',
  email: 'quzkhanh.vn@gmail.com',
  github: 'https://github.com/quzkhanh',
  // Served by GitHub so the page icon follows the GitHub avatar without a rebuild.
  avatar: 'https://github.com/quzkhanh.png',
  properties: [
    { label: 'Role', value: 'Mobile & web developer' },
    { label: 'Works', value: 'Solo, from first screen to release' },
  ],
  skills: [
    { icon: DeviceMobile, title: 'Mobile apps', text: 'Native or cross-platform apps, from first screen to release.' },
    { icon: PenNib, title: 'UI from design', text: 'Figma designs turned into smooth, pixel-perfect screens.' },
    { icon: Browser, title: 'Websites', text: 'Fast, clean sites and landing pages.' },
    { icon: Lightning, title: 'Automation', text: 'Scripts and tools that take repetitive work off your hands.' },
  ],
  callout: 'Have an app in mind? Tell me what you want to build.',
};
