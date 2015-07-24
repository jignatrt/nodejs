var passport = require('passport');

module.exports = {
    settings: function (req, res) {
        var user = req.body;
        User.update({id: user.id}, user, function (err, status) {
            if (err) {
                return res.json(500, {
                    message: "Internal error",
                    err: err
                });
            } else {
                User.findOne({id: user.id}, function (err, user) {
                    if (err) {
                        return res.json(500, {
                            message: "Internal error",
                            err: err
                        });
                    } else {
                        delete user.password;
                        delete user.createdAt;
                        delete user.modifiedAt;
                        return res.json(200, {
                            user: user
                        });
                    }
                });
            }
        });
    }
};

