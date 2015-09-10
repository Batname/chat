const fs = require('fs');
const co = require('co');
const path = require('path');
const gutil = require('gulp-util');
const projectRoot = require('config').projectRoot;
const mongoose = require('../modules/mongoose');
const async = require('async');

function open(cb){
    mongoose.connection.on('open', cb);
}

function dropDatabase(cb){
    let db = mongoose.connection.db;
    db.dropDatabase(cb);
}

function requireModels(cb) {
    require('../handlers/users/models/user');
    async.each(Object.keys(mongoose.models), (modelName, cb) => {
        mongoose.models[modelName].ensureIndexes(cb);
    }, cb);
}

function createUsers(cb){
    async.each(this, (userData, cb) => {
        let user = new mongoose.models.User(userData);
        user.save(cb);
    }, cb);
}

function result(err, result){
    mongoose.disconnect();
}

module.exports = () => {
    return cb => {
        
        let args = require('yargs')
          .usage("gulp db:load --from fixtures/user")
          .demand(['from'])
          .describe('from', 'file to import')
          .argv;

        let dbPath = path.join(projectRoot, args.from);

        let data = (typeof dbPath == 'string') ? require(dbPath) : dbPath;

        gutil.log("loading db " + dbPath);

        async.series([open, dropDatabase, requireModels, createUsers.bind(data)], result);

    };
};