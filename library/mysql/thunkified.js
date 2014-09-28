"use strict";

(function () {
    var mysql = require('mysql'),
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
    module.exports = function (/* arguments */) {
        /* Копируем массив аргументов */
        var args = [].slice.apply(arguments);
        /* Возвращаем функцию, которая вернет результаты в переданный её колбек */
        return function (next) {
            args.push(function (err, rows, fields) {
                if (err) return next(err);
                return next(null, rows);
            });
            connection.query.apply(connection, args);
        }
    }
}());