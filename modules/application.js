const express = require('express');
const path = require('path');
const _ = require('lodash');

let app = express();

app.requireHandler = function(rootDir, paths) {

  const folder = path.join(rootDir, '/handlers');

  if(_.isArray(paths) && !_.isEmpty(paths)){
    paths.forEach( path => {
      let handler = require(`${folder}/${path}`);
      if (handler.init) handler.init(this);
    });
  }

};

module.exports = app;