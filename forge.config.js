const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');

module.exports = {
  packagerConfig: {
    // For the application icon, don't include file extension
    icon: path.resolve(__dirname, 'assets/icon'),
    executableName: 'pomodoro-timer'
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel', // Windows
      config: {
        name: 'pomodoro-timer',
        // For Windows, you need an .ico file for the setup icon with explicit extension
        setupIcon: path.resolve(__dirname, 'assets/icon.ico'),
        // Create desktop shortcut
        createDesktopShortcut: true,
        // Create start menu shortcut
        createStartMenuShortcut: true,
        // Name shown in shortcuts
        shortcutName: 'Pomodoro Timer',
        // Name of installer file
        setupExe: 'Pomodoro-Timer-Setup.exe'
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
