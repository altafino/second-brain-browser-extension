import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: ({ browser, manifestVersion }) => ({
    name: 'Second Brain',
    description: 'Capture any page or highlighted text to your Second Brain Cloudflare Worker.',
    permissions: ['activeTab', 'storage', 'scripting'],
    host_permissions: ['<all_urls>'],
    icons: {
      16: '/icon/16.png',
      48: '/icon/48.png',
      128: '/icon/128.png',
    },
    ...(browser === 'firefox' && {
      browser_specific_settings: {
        gecko: {
          id: 'second-brain@altafino.com',
          // scripting API requires Firefox 102+
          strict_min_version: '102.0',
          // Nothing is collected; captures go only to the user's own Worker
          data_collection_permissions: { required: ['none'] },
        },
      },
    }),
    commands: {
      [manifestVersion === 2 ? '_execute_browser_action' : '_execute_action']: {
        suggested_key: { default: 'Alt+Shift+B' },
        description: 'Open Second Brain popup',
      },
      'quick-capture': {
        suggested_key: { default: 'Alt+Shift+S' },
        description: 'Quick capture current page (no popup)',
      },
    },
  }),
});
