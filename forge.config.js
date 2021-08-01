const path = require("path")
const cpy = require("cpy")
module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "femme_gallery_react"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack.main.config.js",
        devContentSecurityPolicy: "default-src 'self' data:; script-src 'self' data:; img-src 'self' https://femme.blob.core.windows.net/; style-src 'self' 'unsafe-inline';",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/rendererContext/index.html",
              js: "./src/rendererContext/renderer.ts",
              name: "main_window",
              preload: {
                js: "./src/preloadContext/preload.ts"
              }
            }
          ]
        }
      }
    ]
  ]
};