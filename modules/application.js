const express = require('express');
const path = require('path');
const _ = require('lodash');

let app = express();

app.requireHandler = function(root_dir, paths) {

  const folder = path.join(root_dir, '/handlers');

  if(_.isArray(paths) && !_.isEmpty(paths)){
    paths.forEach( path => {
      let handler = require(`${folder}/${path}`);
      if (handler.init) handler.init(this);
    });
  }

};

module.exports = app;