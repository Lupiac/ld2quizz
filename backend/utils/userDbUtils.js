const nano = require('nano')('http://localhost:5984');

const usersDb = nano.db.use('users');

function addUser(username, password) {
    return usersDb.insert({_id: username, password: password, role: 2, quizzes: []}).then((userCreatedResult) => { //todo change role to 1
        return {message: 'user created !', username: username};
    }).catch((error) => {
        if(error.message === 'Document update conflict.') {
            throw {errorCode: 409, message: "user " + username + " already exists"}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    })
}

function login(username, password) {
    let user;
    return usersDb.get(username).then((userResult) => {
        if(userResult.password === password) {
            //todo gen token
            userResult.token = "1111";
            userResult.tokenDate = new Date();
            user = userResult;
            return usersDb.insert(userResult);
        } else {
            throw {errorCode: 401, message: 'wrong password'};
        }
    }).then(() => {
        return {message: 'login success', token: user.token};
    }).catch((error) => {
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "username " + username + " not exists"}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    })
}

function logout(username, token) {
    return verifyToken(username, token).then((user) => {
        user.tokenDate = new Date().setFullYear(2000);
        return usersDb.insert(user).then((userLoggedResult) => {
            return {message: 'disconnected'};
        })
    }).catch((error) => {
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    });
}

function updateRole(username, token, usernameToUpdate, role) {
    return verifyToken(username, token).then((user) => {
        if(user.role < 3) {
            throw {errorCode: 403, message: 'not allowed'}
        }
        return usersDb.get(usernameToUpdate);
    }).then((userToUpdate) => {
        userToUpdate.role = role;
        return usersDb.insert(userToUpdate);
    }).then(() => {
        return {message: 'role updated'}
    }).catch((error) => {
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    })
}

function verifyToken(username, token) {
    return usersDb.get(username).then((user) => {
        if(user.token !== token || new Date(new Date() - new Date(user.tokenDate)).getTime() > 3600000) {
            throw {errorCode: 401, message: 'wrong token session'}
        }
        return user;
    }).catch((error) => {
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "username " + username + " not exists"}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    })
}

function updateUser(userData) {
    return usersDb.insert(userData).then((userUpdated) => {
        return {message: 'user updated !', username: userData.username};
    }).catch((error) => {
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "username " + userData.username + " not exists"}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    })
}

module.exports = {
    addUser,
    login,
    verifyToken,
    logout,
    updateUser,
    updateRole
}