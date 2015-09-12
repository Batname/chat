import gulp from 'gulp';
import webpack from 'webpack';
import minimist from 'minimist';
import gulpUtil from 'gulp-util';

const argv = minimist(process.argv.slice(2));

export default function(options){
  return cb => {
    const config = require('../config/webpack.config.js');
    const bundler = webpack(config);
    const verbose = !!argv.verbose;
    let bundlerRunCount = 0;

    function bundle(err, stats) {
      if (err) {
        throw new gulpUtil.PluginError('webpack', err);
      }

      console.log(stats.toString({
        colors: gulpUtil.colors.supportsColor,
        hash: verbose,
        version: verbose,
        timings: verbose,
        chunks: verbose,
        chunkModules: verbose,
        cached: verbose,
        cachedAssets: verbose
      }));

      if (++bundlerRunCount === (options.watch ? config.length : 1)) {
        return cb();
      }
    }

    if (options.watch) {
      bundler.watch(200, bundle);
    } else {
      bundler.run(bundle);
    }
  }
}