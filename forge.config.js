const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    icon: './assets/icon' // Icon for the app
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel', // Windows
      config: {
        // Custom options
      }
    },
    {
      name: '@electron-forge/maker-zip', // macOS
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb', // Linux
      config: {}
    }
  ]
};
