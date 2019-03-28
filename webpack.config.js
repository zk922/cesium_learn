const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "js/[hash].bundle.js"
  },
  mode: "development",
  devtool: ""
};