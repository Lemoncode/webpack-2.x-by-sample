module.exports = {
  entry: ['./students.ts'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader:'awesome-typescript-loader',
        },
    ],
  },
};
