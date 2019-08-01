var mainConfig = {
  mode: "development",
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  target: 'electron-main',
  entry: {
    "main": "./main/main.js"
  }
};
var rendererConfig = {
  mode: "development",
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  target: 'electron-renderer',
  entry: {
    "reversi": ['@babel/polyfill',"./renderer/reversi.js"]
  }
};
module.exports = [mainConfig, rendererConfig];