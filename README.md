# Pomodoro Timer

A clean, minimalist Electron-based desktop application for time management using the Pomodoro Technique.

![Pomodoro Timer Icon](assets/icon.png)

![Pomodoro Timer Screenshot](assets/Screenshot%202025-06-16%20191103.png)

## Features

- 🕒 Customizable work and break durations
- 📊 Visual progress tracking with progress bar
- 🔔 Session completion notifications
- 📝 Session counter to track your productivity
- 🖥️ Cross-platform desktop application (Windows, macOS, Linux)
- 🎨 Clean, distraction-free interface

## Installation

### Download Pre-built Binaries

Download the latest version for your operating system from the [Releases](https://github.com/your-username/pomodoro-timer/releases) page.

### Build from Source

If you prefer to build the application yourself:

1. Clone this repository:
   ```
   git clone https://github.com/your-username/pomodoro-timer.git
   cd pomodoro-timer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

4. Build distributable packages:
   ```
   npm run make
   ```
   The packaged applications will be available in the `out/make` directory.

## Creating Installers

This project uses Electron Forge for packaging and creating installers. The following installers are configured:

### Windows Installer

Run the following command to create a Windows installer (`.exe`):
```
npm run make -- --platform win32
```

The Windows installer will be created in `out/make/squirrel.windows/x64/`.

### macOS Installer

Run the following command to create a macOS package (`.zip`):
```
npm run make -- --platform darwin
```

The macOS package will be created in `out/make/zip/darwin/`.

### Linux Installer

Run the following command to create a Linux Debian package (`.deb`):
```
npm run make -- --platform linux
```

The Linux package will be created in `out/make/deb/x64/`.

### All Platforms

To create installers for all configured platforms (requires appropriate development environment):
```
npm run make
```

## Customizing Installers

Installer configurations are defined in the `forge.config.js` file. You can customize:

- Application icon
- Executable name
- Installer name
- Shortcut behavior
- And more

For more details on customization options, refer to the [Electron Forge documentation](https://www.electronforge.io/config/makers).

## Usage

1. Set your preferred work and break durations (in minutes)
2. Click "Start" to begin your work session
3. Focus on your task until the timer completes
4. Take a break when prompted
5. Repeat the cycle to maximize productivity

## What is the Pomodoro Technique?

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a "pomodoro", from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student.

## Development

### Project Structure

```
pomodoro-timer/
├── assets/            # Application icons and images
├── src/
│   ├── index.html     # Main application UI
│   ├── index.css      # Styles for the application
│   ├── index.js       # Main Electron process
│   ├── preload.js     # Preload script for secure IPC
│   └── script.js      # Renderer process logic
├── forge.config.js    # Electron Forge configuration
└── package.json       # Project dependencies and scripts
```

### Technologies Used

- [Electron](https://www.electronjs.org/) - Cross-platform desktop app framework
- [Electron Forge](https://www.electronforge.io/) - Complete tool for building Electron apps

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the Pomodoro Technique by Francesco Cirillo
- Built with Electron and Electron Forge

---

Created by Tristan Hendricks © 2025