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