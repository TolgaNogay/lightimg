# lightimg 🖼️

A lightweight, framework-agnostic CLI tool that converts and optimizes your images to **WebP** format. Perfect for Next.js, Astro, Go, or any other web project where performance matters.

[![npm version](https://img.shields.io/npm/v/@tolganogayy/lightimg.svg)](https://www.npmjs.com/package/@tolganogayy/lightimg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- 📂 **Flexible Scanning**: Select any directory via interactive prompt or CLI argument.
- 🔄 **Smart Conversion**: Automatically converts `png`, `jpg`, `jpeg`, `avif`, and `tiff` to **WebP**.
- 📁 **Organized Output**: Creates an `/optimized` folder to keep your originals safe.
- ⚡ **Framework Independent**: Works anywhere—Next.js, Astro, Go, Hugo, or plain HTML.
- 🧠 **Robust Processing**: Gracefully skips corrupted files and keeps going.
- 📊 **Insightful Feedback**: Shows exactly how much disk space you saved.

## 📦 Installation

You can run it instantly without installation:

```bash
npx @tolganogayy/lightimg
```

Or install it globally for frequent use:

```bash
npm install -g @tolganogayy/lightimg
```

## 🛠️ Usage

### Interactive Mode

Run the command and follow the beautiful prompts:

```bash
lightimg
```

### Direct Mode

Pass the target directory path as an argument:

```bash
lightimg ./public/images
```

## 🧠 How it Works

1. **Scan**: Recursively looks for images while ignoring `node_modules` and already `optimized` folders.
2. **Filter**: Identifies supported formats (`.jpg`, `.png`, etc.).
3. **Convert**: Uses the high-performance [Sharp](https://sharp.pixelplumbing.com/) engine to convert to WebP with a default quality of `80`.
4. **Report**: Summarizes the number of files processed and the total size reduction.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/TolgaNogay/lightimg/issues).

## 📄 License

This project is [MIT](LICENSE) licensed.

---

Made with ❤️ by [Tolga Nogay](https://github.com/TolgaNogay)
