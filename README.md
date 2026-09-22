# Image to PDF Converter

**Live Demo:** [https://imagetopdf-gamma.vercel.app/](https://imagetopdf-gamma.vercel.app/)

A modern, fast, and secure Angular web application that converts images into a multi-page PDF directly in your browser.

## Features

- **Multi-Image Support**: Upload and combine multiple images (PNG, JPG/JPEG, WebP) into a single PDF document.
- **Client-Side Processing**: Fast and private conversion handled completely inside the browser using jsPDF — no images are sent to an external server.
- **Live Image Previews**: Preview uploaded images in a responsive grid before converting.
- **Easy Management**: Remove unwanted images with a single click.
- **Aspect Ratio Preservation**: Automatically scales each image proportionally to fit standard PDF pages cleanly.
- **Modern UI/UX**: Clean, responsive layout with smooth gradients and interactive feedback.

## Tech Stack

- [Angular](https://angular.io/) (v16+)
- [jsPDF](https://github.com/parallax/jsPDF)
- TypeScript, HTML5, CSS3

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.14.0 or higher recommended)
- [Angular CLI](https://github.com/angular/angular-cli) (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/imagetopdf.git
   ```
2. Navigate to the project directory:
   ```bash
   cd imagetopdf
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any of the source files.

### Build

Run the build command to generate production-ready static assets in the `dist/` folder:
```bash
ng build
```

## How to Use

1. Click the upload zone or drag and drop your images into the app.
2. Review the selected images in the preview section (remove any if needed).
3. Click the **Generate PDF** button to download your combined PDF.

## License

This project is licensed under the MIT License.
