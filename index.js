"use strict";

(function () {
    var co = require('co'),
        thunkify = require('thunkify'),
        mysql = require('./library/mysql/index'),
        thunkifiedMysql = thunkify(mysql),
        promisedMysql = require('./library/mysql/promised'),
        thunkifiedMysqlV2 = require('./library/mysql/thunkified');

    co(function * testing() {
        console.log('thunkifiedMysql --> ', yield thunkifiedMysql('SHOW DATABASES'));
        console.log('promisedMysql --> ', yield promisedMysql('SHOW DATABASES'));
        console.log('thunkifiedMysqlV2 --> ', yield thunkifiedMysqlV2('SHOW DATABASES'));
    })();
}());