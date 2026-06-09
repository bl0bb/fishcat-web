# FishCat Web

A minimal, barebone web interface for running the FishCat chess engine directly in your browser.

FishCat Web combines a WebAssembly-powered chess engine with a lightweight user interface for analysis and experimentation.

## Features

* View the overall evaluation and best moves ahead for the current position
* Fast WebAssembly engine execution
* Runs entirely client-side
* Responsive design for desktop and mobile devices
* No dependencies (other than the underlying FishCat chess engine)

## Demo

Open the application in your browser and start playing or analyzing immediately.

## How It Works

FishCat Web loads a WebAssembly build of the FishCat chess engine and communicates with it using exposed WASM functions. All computation happens locally in your browser.

This means:

* No backend servers are needed
* Analysis remains private
* Performance is comparable to native applications on modern hardware
* The application can be hosted as a static website

## Development

### Prerequisites

* Node.js 18+
* npm, pnpm, or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Generated files will be placed in the build output directory.

### Preview Production Build

```bash
npm run preview
```