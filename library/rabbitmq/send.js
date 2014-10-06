"use strict";

(function () {
    var amqp = require('amqplib'),
        when = require('when');

    amqp.connect('amqp://10.1.18.211').then(function (conn) {
        return when(conn.createChannel().then(function (ch) {
            var ex = 'users',
                ok = ch.assertExchange(ex, 'fanout', {durable: false}),
                message = JSON.stringify({id: 1489777});

            return ok.then(function () {
                ch.publish(ex, '', new Buffer(message));
                console.log(" [x] Sent '%s'", message);
                return ch.close();
            });
        })).ensure(function () {
            conn.close();
        });
    }).then(null, console.warn);
}());

