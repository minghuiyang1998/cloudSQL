const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/index'),
  output: path.resolve(__dirname, 'output'),
  outputfile: 'bundle.js',
};
