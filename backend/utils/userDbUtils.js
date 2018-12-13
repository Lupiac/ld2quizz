const nano = require('nano')('http://localhost:5984');
const crypto = require('crypto-js')

const usersDb = nano.db.use('users');

function addUser(username, password) {
    return usersDb.insert({_id: username, password: crypto.SHA256(password).toString(), role: 3, quizzes: []}).then((userCreatedResult) => {
        return {message: 'user created !', username: username};
    }).catch((error) => {
        if(error.message === 'Document update conflict.') {
            throw {errorCode: 409, message: "l'utilisateur " + username + " existe déjà"}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

function login(username, password) {
    let user;
    return usersDb.get(username).then((userResult) => {
        if(userResult.password === crypto.SHA256(password).toString()) {
            userResult.token =   Math.random().toString(36).substr(2)
                + Math.random().toString(36).substr(2)
                + Math.random().toString(36).substr(2)
                + Math.random().toString(36).substr(2);
            userResult.tokenDate = new Date();
            user = userResult;
            return usersDb.insert(userResult);
        } else {
            throw {errorCode: 401, message: 'mot de passe incorrect'};
        }
    }).then(() => {
        return {message: 'authentification réussi', token: user.token};
    }).catch((error) => {
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "l'utilisateur " + username + " n'existe pas"}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

function logout(username, token) {
    return verifyToken(username, token).then((user) => {
        user.tokenDate = new Date().setFullYear(2000);
        return usersDb.insert(user).then((userLoggedResult) => {
            return {message: 'déconnecté'};
        })
    }).catch((error) => {
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    });
}

function updateUserInformation(username, token, usernameToUpdate, role, oldPassword, newPassword) {
    return new Promise(function (resolve, reject) {
        if(role != null) {
            resolve(updateRole(username, token, usernameToUpdate, role));
        }
        resolve()
    }).then(() =>{
        if(newPassword != null) {
            return updatePassword(username, token, usernameToUpdate, oldPassword, newPassword);
        }
        return;
    }).then(() => {
        return {message: "l'utilisateur à été mis à jour"}
    }).catch((error) => {
        console.log(error);
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })

}

function updateRole(username, token, usernameToUpdate, role) {
    return verifyToken(username, token).then((user) => {
        if(user.role < 3) {
            throw {errorCode: 403, message: 'non autorisé'}
        }
        return usersDb.get(usernameToUpdate);
    }).then((userToUpdate) => {
        userToUpdate.role = role;
        return usersDb.insert(userToUpdate);
    }).then(() => {
        return {message: 'le role à été mis à jour'}
    }).catch((error) => {
        console.log(error);
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

function updatePassword(username, token, usernameToUpdate, oldPassword, newPassword) {
    let user;
    return verifyToken(username, token).then((userResult) => {
        if(userResult.role < 3 && username !== usernameToUpdate) {
            throw {errorCode: 403, message: 'non autorisé'};
        }
        user = userResult;
        return usersDb.get(usernameToUpdate);
    }).then((userToUpdate) => {
        if(user.role < 3 && crypto.SHA256(oldPassword).toString() !== usernameToUpdate.password) {
            throw {errorCode: 403, message: "l'ancien mot de passe est incorrect"};
        }
        userToUpdate.password = crypto.SHA256(newPassword).toString();
        return usersDb.insert(userToUpdate);
    }).then(() => {
        return {message: "le mot de passe a été changé"}
    }).catch((error) => {
        console.log(error);
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

function verifyToken(username, token) {
    return usersDb.get(username).then((user) => {
        if(user.token !== token || new Date(new Date() - new Date(user.tokenDate)).getTime() > 3600000) {
            throw {errorCode: 401, message: "le jeton de connection n'est plus ou pas valide"}
        }
        return user;
    }).catch((error) => {
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "l'utilisateur " + username + " n'existe pas"}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

function updateUser(userData) {
    return usersDb.insert(userData).then((userUpdated) => {
        return {message: "l'utilisateur a été mis à jour !", username: userData.username};
    }).catch((error) => {
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "l'utilisateur " + userData.username + " n'existe pas"}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

function deleteUser(username, token, usernameToDelete) {
    return verifyToken(username, token).then((user) => {
        if(user.role < 3) {
            throw {errorCode: 403, message: "vous n'etes pas autorisé à supprimer ce compte"}
        }
        return usersDb.get(usernameToDelete);
    }).then((userToDelete) => {
        return usersDb.destroy(userToDelete._id, userToDelete._rev);
    }).then(() => {
        return {message: "l'utilisateur a été supprimé"};
    }).catch((error) => {
        console.log(error);
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "l'utilisateur " + usernameToDelete + " n'existe pas"}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

module.exports = {
    addUser,
    login,
    verifyToken,
    logout,
    updateUser,
    updateRole,
    deleteUser,
    updateUserInformation
}
