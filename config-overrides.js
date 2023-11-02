const { override } = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isEnvProductionProfile =
  process.env.NODE_ENV === 'production' && process.env.PROFILE === 'true';

module.exports = override((config, env) => {
  if (env === 'production') {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: isEnvProductionProfile,
          keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ];
    config.plugins.push(
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    );
    config.devtool = isEnvProductionProfile ? 'source-map' : false;
  }

  return config;
});
