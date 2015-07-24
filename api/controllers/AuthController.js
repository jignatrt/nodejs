var passport = require('passport');

module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    login: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!user)) {
                return res.json(401, {
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    res.json(500, {err: err});
                } else {
                    delete user.password;
                    delete user.createdAt;
                    delete user.modifiedAt;
                    return res.json(200, {
                        message: info.message,
                        user: user
                    });
                }
            });
        })(req, res);
    },
    logout: function (req, res) {
        req.logout();
        res.json(200, {"meta": {"data": "User is logged out successfully !"}});
    }
};

