module.exports = {
  entry: "./src/app.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  module: {
      loaders: [
          { test: /\.css$/, loaders: ["style", "css"] },
          { test: /\.json$/, loader: "json" }
      ]
  }
};