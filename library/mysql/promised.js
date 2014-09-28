"use strict";

(function () {
    var mysql = require('mysql'),
        Q = require('q'),
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
    module.exports = function (/* arguments */) {
        /* Создаем объект с обещанием того, что мы когда-то вернем результат запроса, и копируем аргументы функции */
        var deferred = Q.defer(),
            args = [].slice.call(arguments);

        args.push(function (err, rows, fields) {
            /* Если возникла ошибка, то мы уведомляем всех, кому дали обещание о том, что не в состоянии его выполнить */
            if (err) return deferred.reject(err);
            /* Выполняем наше обещание */
            return deferred.resolve(rows);
        });
        /* Применяем к стандартной функции аргументы и передаем в качестве this объект connection */
        connection.query.apply(connection, args);
        return deferred.promise;
    }
}());