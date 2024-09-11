const CracoAlias = require("craco-alias");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  babel: {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic", // 자동 JSX 변환 활성화
        },
      ],
    ],
    plugins: [
      [
        "babel-plugin-styled-components",
        {
          displayName: true,
          fileName: false,
        },
      ],
    ],
  },
  webpack: {
    plugins: {
      add: [
        new InjectManifest({
          swSrc: "./src/service-worker.js",
          swDest: "service-worker.js",
        }),
      ],
    },
  },
};
