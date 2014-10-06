"use strict";

(function () {
    var amqp = require('amqplib');

    amqp.connect('amqp://10.1.18.211').then(function (conn) {
        process.once('SIGINT', function () {
            conn.close();
        });
        return conn.createChannel().then(function (ch) {

            /**
             * Вот эту функцию надо переписать
             * @param msg {String} сообщение от RabbitMQ
             */
            function processMessage(msg) {
                console.log(" [x] ", JSON.parse(msg.content.toString()));
            }

            var q = 'users',
                ok = ch.assertExchange(q, 'fanout', {durable: false});
            ok = ok.then(function () {
                return ch.assertQueue('', {exclusive: true});
            });
            ok = ok.then(function (qok) {
                return ch.bindQueue(qok.queue, q, '').then(function () {
                    return qok.queue;
                });
            });
            ok = ok.then(function (queue) {
                return ch.consume(queue, processMessage, {noAck: true});
            });
            return ok.then(function () {
                console.log(' [*] Waiting for logs. To exit press CTRL+C');
            });
        });
    }).then(null, console.warn);
}());