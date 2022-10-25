import component from './vi-VI/component';
import globalHeader from './vi-VI/globalHeader';
import menu from './vi-VI/menu';
import pages from './vi-VI/pages';
import pwa from './vi-VI/pwa';
import settingDrawer from './vi-VI/settingDrawer';
import settings from './vi-VI/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Produced by VDTSol',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
