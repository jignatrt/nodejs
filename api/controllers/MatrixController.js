var passport = require('passport');
var Mozscape = require('mozscape').Mozscape;
var moz = new Mozscape('mozscape-99a7a44937', '6a07d1c674839a3ba2dcc2c4077ea4f9');
var request = require('request');
var google = require('google');
module.exports = {
    getMatrixData: function (req, res) {
        var limitPerPage = req.param("resultsPerPage") ? req.param("resultsPerPage") : 25;
        var page = req.param("page") ? req.param("page") : 1;
        var search = req.param("search");
        var accessId = req.param("access");
        var secret = req.param("secret");
        console.log("page " + page + "search " + search + "acceesId " + accessId + "secret " + secret);
        if (page && limitPerPage && search && accessId) {
            google.resultsPerPage = limitPerPage;
            var nextCounter = 1;
            google(search, (page - 0), function (err, next, links) {
                if (err) {
                    console.error(err);
                    return res.json(500, {
                        message: "Couldn't retrieve data,Server is not responding.",
                        err: err
                    });
                } else if (!err && links.length > 0) {
                    var data = _.map(links, 'link');
//                    console.log("links " + JSON.stringify(data));
                    if (nextCounter < 0) {
                        nextCounter += 1;
                        if (next) {
                            next();
                        }
                    } else {
                        //                        var data = ["www.moz.com", "www.apple.com", "www.pizza.com"];
                        var options = {
                            hostname: 'lsapi.seomoz.com',
                            path: 'linkscape',
                            userAgent: 'node-mozscape (https://github.com/scott-wyatt/node-mozscape)',
                            accessId: accessId,
//                            accessId: 'mozscape-99a7a44937',                            
//                            secret: '6a07d1c674839a3ba2dcc2c4077ea4f9'
                            secret: secret
                        };
                        var path = 'http://' + options.hostname + '/' + options.path + '/' + 'url-metrics/' + "?cols=" + "103079215108";
                        var auth = new Buffer(options.accessId + ':' + options.secret).toString('base64');
                        request({
                            url: path,
                            method: "POST",
                            headers: {
                                'Authorization': 'Basic ' + auth,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        }, function (e, r, body) {
                            if (e) {
                                console.error(e);
                                return res.json(500, {
                                    message: "Couldn't retrieve data,Server is not responding.",
                                    err: e
                                });
                            } else {
                                return res.json(200, {
                                    data: JSON.parse(body)
                                });
                            }
                        });
                    }
                } else {
                    return res.json(200, {
                        message: "No result found",
                        data: []
                    });
                }
            });
        } else {
            return res.json(400, {
                message: "Bad request.Query parameter missing."
            });
        }
    }
};

