# lod2quiz frontend

## Requirements
-   lod2quiz API
-   lod2quiz backend
-   NPM and NodeJS

## Project structure
The **_/src_** folder contains 3 subfolders:
-   **_assets_**: used to store images ans assets
-   **_components_**: the different custom components used by each page
-   **_views_**: the views of the application

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment
The files in the **_/dist_** folder are supposed be served by an HTTP server
You can deploy the built content in the dist directory to any static file server

Run:
```
npm run build
```
to create and fill the folder with the built content

## Previewing Locally
The easiest way to preview your production build locally is using a Node.js static file server

```
npm install -g serve
# -s flag means serve it in Single-Page Application mode
# which deals with the routing problem below
serve -s dist
```

More details here: https://cli.vuejs.org/guide/deployment.html#general-guidelines
