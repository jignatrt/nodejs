/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var async = require('async');
module.exports.bootstrap = function (cb) {
    function createUserData(done) {
        var users = [
            {
                "username": "test",
                "password": "test123",
                "email": "test@lookup.com",
                "mozKey": "mozscape-99a7a44937",
                "mozAccessId": '6a07d1c674839a3ba2dcc2c4077ea4f9',
                "majesticKey": "mymajestickey"
            }
        ];
        User.count().exec(function (err, count) {
            if (err)
                return done(err);
            if (count > 0)
                return done();
            User.create(users).exec(done);
        });
    }
    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    async.parallel([
        createUserData
    ], cb);

};
