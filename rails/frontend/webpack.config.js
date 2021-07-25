const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/main.jsx"),
  output: {
    // 出力先のディレクトリ
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true,
    hot: true,
    port: 3500,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"],
          },
        },
      },
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  target: ["web", "es5"],
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
