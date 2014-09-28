Уроки для работы с ES6 в node.js
===================


##Содержание

- [Уроки для работы с ES6 в node.js](#user-content-%D0%A3%D1%80%D0%BE%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B-%D1%81-es6-%D0%B2-nodejs)
	- [Содержание](#user-content-%D0%A1%D0%BE%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%B8%D0%B5)
	- [Подготовка к работе](#user-content-%D0%9F%D0%BE%D0%B4%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B0-%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B5)
		- [GIT](#user-content-git)
		- [node.js](#user-content-nodejs)
	- [Преобразование фунций для работы с co.js](#user-content-%D0%9F%D1%80%D0%B5%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%84%D1%83%D0%BD%D1%86%D0%B8%D0%B9-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B-%D1%81-cojs)
		- [Преобразование при помощи thunkify](#user-content-%D0%9F%D1%80%D0%B5%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%B8-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%B8-thunkify)
		- [Преобразование при помощи promise библиотеки Q](#user-content-%D0%9F%D1%80%D0%B5%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D1%80%D0%B8-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%B8-promise-%D0%B1%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D0%B8-q)
		- [Преобразование вручную без сторонних инструментов](#user-content-%D0%9F%D1%80%D0%B5%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2%D1%80%D1%83%D1%87%D0%BD%D1%83%D1%8E-%D0%B1%D0%B5%D0%B7-%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%BD%D0%BD%D0%B8%D1%85-%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2)
	- [Написание тестов при помощи co и jasmine-node](#user-content-%D0%9D%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2-%D0%BF%D1%80%D0%B8-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%B8-co-%D0%B8-jasmine-node)


##Подготовка к работе
###GIT
Как пользоваться гитхабом, можно посмотреть [тут](https://help.github.com/articles/set-up-git).  
Для начала нам понадобится стянуть исходный код для занятий, выполнив комманду:

```bash
git clone https://github.com/ria-com/node-koajs-skeleton.git
```
###node.js
Для корректной работы всех примеров понадобится версия не ниже 0.11.x. После этого необходимо в папке с проектом выполнить следующую комманду:
```bash
npm install
```
##Преобразование фунций для работы с [co.js](https://github.com/visionmedia/co)
Для того чтобы перейти к данному уроку в папке с проектом выполните комманду:
```bash
git checkout -f step-0
```
В данном примере мы рассмотрим, как преобразовать обычную функцию для работы с MySQL в такую, чтобы подходила для использования в генераторах.
Самый простой вариант описания модуля, который создает подключение к MySQL и выполняет запрос выглядит следующим образом:
```javascript
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
```

Данный модуль находится в проекте в папке *./library/mysql/index.js*.
Существует, как минимум, три варианта преобразования данного модуля в необходимый нам:

> **Методы преобразования**

> 1. При помощи специальной библиотеки [thunkify](https://github.com/visionmedia/node-thunkify)
> 2. Вручную при помощи promise библиотеки [Q](https://github.com/kriskowal/q)
> 3. И вручную без всяких посторонних инструментов

###Преобразование при помощи [thunkify](https://github.com/visionmedia/node-thunkify)
Первый вариант самый простой и будет выглядеть приблизительно следующим образом:
```javascript
"use strict";

(function () {
	var co = require('co'),
	    thunkify = require('thunkify'),
	    mysql = require('./library/mysql/index'),
	    thunkifiedMysql = thnkify(mysql);
	    
    co(function * testing() {
        console.log('thunkifiedMysql --> ', yield thunkifiedMysql('SHOW DATABASES'));
    })();
}());
```
Выглядит все довольно просто. Но одно небольшое неудобство скрывается здесь. Для того, чтобы понять в чем дело, необходимо рассмотреть выполнение запросов при помощи обычного подхода:
```javascript
"use strict";

(function () {
	var mysql = require('./library/mysql/index');

	mysql('SHOW DATABASES', function(err, rows, fields){ 
		console.log('err --> ', err);
		console.log('rows --> ', rows);
	});
}());
```
Стоит обратить внимание на то, что функция-callback принимает на вход ВСЕГДА три аргумента. Для того, чтобы нормально преобразовать функцию при помощи *thunkify* желательно, чтобы она принимала на вход только два аргумента. Впринципи, ничего страшного не произойдет, если мы вызовем преобразованную функцию при помощи *yield*. Просто результат, в нашем случае *rows*, будет находится в массиве результатов первым, а вторым будет объект *fields*. Все вышесказанное можно выразить следующим примером:
```javascript
"use strict";

(function () {
	var co = require('co'),
	    thunkify = require('thunkify'),
	    mysql = require('./library/mysql/index'),
	    thunkifiedMysql = thnkify(mysql);
	    
    co(function * testing() {
	    var result = yield thunkifiedMysql('SHOW DATABASES');
        console.log('rows --> ', result[0]);
        console.log('fields --> ', result[1]);
    })();
}());
```
Как видим, ничего страшного, но, по-моему, слегка неудобно. Для того, чтобы сделать удобно, необходимо разобрать то, как работает библиотека *co* с результатами, которые возвращаются внутри генератора. Упрощенный вариант выглядит так ([полный вариант](https://github.com/visionmedia/co#yieldables)):

> **Как работает *co.js* с разными результатами**

> 1. Если функция, тогда выполняем её. При этом передав на вход callback-функцию, которую надо вызвать, когда мы сделаем все нам необходимое. В callback-функцию необходимо передать два аргумента при вызове - ошибка (если есть) и результат
> 2. Если объект *promise*, тогда обрабатываем его. Результатом работы будет аргумент, переданный в фунцию *resolve*, которая по-умолчанию есть у любого объекта *promise*. Ошибкой (если она есть) будет аргумент, переданный в функцию *reject*, которая есть у любого объекта *promise*
> 3. Если массив, тогда применение операции *yield* ко всем его элементам
> 4. Если обычный объект, тогда применение операции *yield* ко всем его полям рекурсивно
> 5. Если функция-генератор, тогда делегирование ему процесса прерывания

###Преобразование при помощи promise библиотеки [Q](https://github.com/kriskowal/q)
Итак, рассмотрим данный, слегка модифицированный, модуль для работы с MySQL:
```javascript
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
```
Данный модуль находится в папке *./library/mysql/promised.js* данного примера.

> **Логика преобразования любого модуля при помощи *promise***

> 1. Создаем объект *deferred*, при помощи специальной функции *defer* в библиотеке *Q*
> 2. Возвращаем *deferred.promise*
> 3. Внутри callback-функции вызываем методы *reject* или *resolve* у объекта *deferred*, и передаем туда результат или ошибку, в зависимости от того, на сколько корректно отработала наша функция

Использовать его можно следующим образом:
```javascript
"use strict";

(function () {
    var co = require('co'),
        promisedMysql = require('./library/mysql/promised');
        
    co(function * testing() {
        console.log('promisedMysql --> ', yield promisedMysql('SHOW DATABASES'));
    })();
}());
```
В данном случае, результатом выполнения функции будет *promise* объект и *co* последует вышеуказанному алгоритму. Причем, в отличии от первого варианта преобразования, мы сразу получаем массив *rows*, потому что сами описали это в нашем модуле (вообще, лично мне не понятно для чего может понадобится объект *fields*, который передается в callback-функцию)

###Преобразование вручную без сторонних инструментов
Рассмотрим, модифицированный вариант первоначального модуля работы с MySQL:
```javascript
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
```
Как можно увидеть из кода, то мы просто не обрабатывали ненужный нам аргумент *fields* (не хочу сказать, что так надо поступать во всех случаях, но в данном примере нас интересует массив *rows*)
Данный модуль находится в папке *./library/mysql/thunkified.js* проекта.

Его использование выглядит приблизительно так же, как и предыдущего:
```javascript
"use strict";

(function () {
    var co = require('co'),
        thunkifiedMysql = require('./library/mysql/thunkified');
        
    co(function * testing() {
        console.log('thunkifiedMysql --> ', yield thunkifiedMysql('SHOW DATABASES'));
    })();
}());
```
##Написание тестов при помощи [co](https://github.com/visionmedia/co) и [jasmine-node](https://github.com/mhevery/jasmine-node)
Для того, чтобы перейти к данному уроку необходимо выполнить следующую комманду в папке с проектом
```bash
git checkout -f step-1
```

Одной из реализуемых, но при этом не очень понятной, является задача последовательного тестирования асинхронных функций. При помощи генераторов и библиотеки *co* это превращается в простой и понятный код.

Для написания тестов был специально написан менеджер, который наглядно продемонстрирует работу spec-файла. Менеджер находится в папке проекта *./library/managers/userManager.js*:

```javascript
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
```

Как видим, ничего сложного в нем нет. Единственная особенность - разные таймауты в функциях добавления/изменения/вытяжки данных. Рассмотрим тест, написанный на методы данного менеджера, он находится в папке проекта *./spec/userManagerSpec.js*:

```javascript
"use strict";

(function(){
    var co = require('co'),
        userManager = require('./../library/managers/userManager'),
        userMock = {
            "name": "James",
            "surname": "Bond"
        };

    describe('Проверяем добавление и изменение данных пользователя', function(){
        var userId, userData;
        it('Добавление нового пользователя', co(function * addUserTest(){
            userId = yield userManager.addUser(userMock);
            expect(userId).toEqual(jasmine.any(Number));
        }));
        it('Изменение данных пользователя', co(function * updateUserTest(){
            userMock.surname = 'Pont';
            var newUserData = yield userManager.changeUser(userId, userMock);
            expect(newUserData.surname).toBe(userMock.surname);
        }));
        it('Вытяжка данных о пользователе', co(function * getUserTest(){
            userData = yield userManager.getUser(userId);
            expect(userData.name).toBe(userMock.name);
            expect(userData.surname).toBe(userMock.surname);
        }));
    });
}());
```

В общем, это один из вариантов реализации тестирования при помощи *jasmine-node* и *co*.
Из папки с проектом запустить тесты можно следующей коммандой:

```bash
npm test
``` 

Результат будет приблизительно следующим:

```bash
> nodejs-learning@1.0.0 test /var/www/nodejs-learning
> /usr/bin/node --harmony ./node_modules/jasmine-node/bin/jasmine-node spec

...

Finished in 3.041 seconds
3 tests, 4 assertions, 0 failures, 0 skipped
```
