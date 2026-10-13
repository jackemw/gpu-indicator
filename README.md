# GPU Indicator

A minimal GNOME Shell extension that displays the current GPU mode (Integrated / Hybrid / Nvidia) in the top bar.

![GNOME 51](https://img.shields.io/badge/GNOME-51-blue)

## Overview

This is a lightweight, read-only companion indicator for the [GPU Profile Selector](https://github.com/LorenzoMorelli/GPU_profile_selector) extension. It polls `envycontrol --query` every 5 seconds and displays the current GPU mode in your GNOME top bar.

It does **not** handle GPU switching — that's handled by GPU Profile Selector. This extension only displays the current state.

## Dependency

This extension requires:

- **[EnvyControl](https://github.com/bayasdev/envycontrol)** — installed and configured for your system
- **[GPU Profile Selector](https://extensions.gnome.org/extension/5009/gpu-profile-selector/)** — the companion extension for actually switching GPU modes

Without EnvyControl, this extension will display "GPU: error".

## Installation

```bash
mkdir -p ~/.local/share/gnome-shell/extensions/gpu-indicator@jackemw
cp extension.js metadata.json ~/.local/share/gnome-shell/extensions/gpu-indicator@jackemw/
```

Then log out and back in (or restart GNOME Shell on X11 with `Alt+F2`, `r`, `Enter`).

Enable with:
```bash
gnome-extensions enable gpu-indicator@jackemw
```

## How It Works

- Polls `envycontrol --query` every 5 seconds
- Displays `GPU: integrated`, `GPU: hybrid`, or `GPU: nvidia` in the top bar
- No settings, no menus — just the current state at a glance

## Developed with AI

This extension was developed with assistance from AI (LLM-based coding agent). All code was generated, reviewed, and deployed with AI guidance.

## License

MIT
