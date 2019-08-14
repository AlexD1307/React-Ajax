const path = require("path");

module.exports = {
   devtool: "source-map",
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js"
   },
   module: {
      rules: [ {
         test: /\.(js|jsx)$/,
         exclude: [ /node_modules/ ],
         use: {
            loader: "babel-loader",
            options: {
               presets: [ "@babel/preset-react" ]
            }
         }
      } ]
   },
   mode: "development",
   devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      watchContentBase: true,
      open: true,
      historyApiFallback: true,
      progress: true
   }
};
