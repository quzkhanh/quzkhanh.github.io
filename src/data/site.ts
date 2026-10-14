import DeviceMobile from '@phosphor-icons/core/assets/fill/device-mobile-fill.svg';
import PenNib from '@phosphor-icons/core/assets/fill/pen-nib-fill.svg';
import Browser from '@phosphor-icons/core/assets/fill/browser-fill.svg';
import Lightning from '@phosphor-icons/core/assets/fill/lightning-fill.svg';
import GameController from '@phosphor-icons/core/assets/fill/game-controller-fill.svg';

export const site = {
  name: 'quzkhanh',
  title: 'quzkhanh, mobile, web & game developer',
  description: 'Mobile, web and game developer. I build apps, 3D web apps and browser games solo, from first screen to release.',
  email: 'quzkhanh.vn@gmail.com',
  github: 'https://github.com/quzkhanh',
  // Served by GitHub so the page icon follows the GitHub avatar without a rebuild.
  avatar: 'https://github.com/quzkhanh.png',
  properties: [
    { label: 'Role', value: 'Mobile, web & game developer' },
    { label: 'Works', value: 'Solo, from first screen to release' },
  ],
  skills: [
    { icon: DeviceMobile, title: 'Mobile apps', text: 'Native or cross-platform apps, from first screen to release.' },
    { icon: Browser, title: 'Websites', text: 'Fast sites and web apps, up to interactive 3D.', link: '#pt-anatomy' },
    { icon: GameController, title: 'Games', text: '2D games for desktop and the browser, built in Godot.', link: '#neon-harbor' },
    { icon: PenNib, title: 'UI from design', text: 'Figma designs turned into smooth, pixel-perfect screens.' },
    { icon: Lightning, title: 'Automation', text: 'Scripts and tools that take repetitive work off your hands.' },
  ],
  callout: 'Have an app or game in mind? Tell me what you want to build.',
};
