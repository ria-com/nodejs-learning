"use strict";

(function () {
    var users = [],
        _ = require('underscore');
    module.exports = {
        addUser: function (params) {
            users.push(params);
            return function (next) {
                setTimeout(function () {
                    return next(null, users.indexOf(params));
                }, 1500);
            }
        },
        getUser: function (id) {
            return function (next) {
                setTimeout(function () {
                    return next(null, users[id]);
                }, 500);
            }
        },
        changeUser: function (id, params) {
            users[id] = _.extend(users[id], params);
            return function (next) {
                setTimeout(function(){
                    return next(null, users[id]);
                }, 1000);
            }
        }
    }
}());