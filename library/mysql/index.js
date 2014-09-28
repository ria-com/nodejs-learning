"use strict";

(function () {
    var mysql = require('mysql'),
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
    module.exports = function(/* arguments */){
        /* Копируем массив аргументов, которые пришли в нашу функцию */
        var args = [].slice.call(arguments);
        /* Применяем полученные аргументы к стандартной функции и передаем в качестве this объект connection*/
        connection.query.apply(connection, args);
    };
}());