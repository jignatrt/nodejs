/**
 * User.js
 */
var bcrypt = require('bcrypt');

function hashPassword(values, next) {
    bcrypt.hash(values.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        values.password = hash;
        next();
    });
}
;

module.exports = {
    attributes: {
        id: {
            columnName: 'id',
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        username: {
            columnName: 'username',
            type: 'STRING',
            required: true,
            unique: true
        },
        password: {
            columnName: 'password',
            type: 'STRING',
            required: true,
            minLength: 6
        },
        mozKey: {
            columnName: 'moz_key',
            type: 'STRING',
            required: true,
        },
        mozAccessId: {
            columnName: 'moz_access_id',
            type: 'STRING',
            required: true,
        },
        majesticKey: {
            columnName: 'majestic_key',
            type: 'STRING',
            required: true,
        },
        email: {
            columnName: 'email',
            type: 'email',
            required: true,
            unique: true
        },
        // Override toJSON instance method to remove password value
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },
        validPassword: function (password, callback) {
            var obj = this.toObject();
            if (callback) {
                //callback (err, res)
                return bcrypt.compare(password, obj.password, callback);
            }
            return bcrypt.compareSync(password, obj.password);
        }
    },
    beforeCreate: function (values, next) {
        hashPassword(values, next);
    },
    beforeUpdate: function (values, next) {
        if (values.password) {
            hashPassword(values, next);
        }
        else {
            //IMPORTANT: The following is only needed when a BLANK password param gets submitted through a form. Otherwise, a next() call is enough.
            User.findOne(values.id, function (err, user) {
                if (err) {
                    next(err);
                }
                else {
                    values.password = user.password;
                    next();
                }
            });
        }
    }
};

