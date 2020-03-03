const fs = require('fs');
const UserSession = require('../model/userSession');
const {serverError, successResponse} = require('./serverResponses');

const getUserToken = (user, callback) => {
    try {
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                callback(err, null);
            }
            console.log(doc);
            callback(null, doc._id);
        });
    } catch (err) {
        callback(err, null);
    }

};

const getUserJson = (user, token) => {
    if (user.is_external_acc) {
        return {
            token: token, user_data: {
                user_name: user.user_name,
                location: user.location,
                avatar_url: user.avatar_url,
                is_external_acc: user.is_external_acc
            }
        };
    } else {
        return {
            token: token, user_data: {
                user_name: user.user_name,
                location: user.location,
                avatar: user.avatar,
                is_external_acc: user.is_external_acc
            }
        };
    }
};


module.exports = {

    getUserJson: (user, token) => {
        if (user.is_external_acc) {
            return {
                token: token, user_data: {
                    user_name: user.user_name,
                    user_id: user.user_id,
                    location: user.location,
                    avatar_url: user.avatar_url,
                    is_external_acc: user.is_external_acc
                }
            };
        } else {
            return {
                token: token, user_data: {
                    user_name: user.user_name,
                    user_id: user.user_id,
                    location: user.location,
                    avatar: user.avatar,
                    is_external_acc: user.is_external_acc
                }
            };
        }

    },

    getFacebookName: (email) => {
        return email.toLowerCase().trim().split('@')[0];
    },

    createNewUser: (newUser, user_name, user_id, password, location, is_external_acc, avatar_path, avatar_url = '') => {
        try {
            newUser.user_name = user_name;
            newUser.user_id = user_id;
            newUser.password = password;
            newUser.location = location;
            newUser.is_external_acc = is_external_acc;
            newUser.avatar_url = avatar_url;
            newUser.avatar = avatar_path ?
                {data: fs.readFileSync(avatar_path), contentType: 'image/jpeg'} :
                null;

            return newUser;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    succLoginResponse: (user, res) => {
        try {
            getUserToken(user, (err, token) => {
                if (err) {
                    console.error(err);
                    return serverError(res);
                }
                const data = getUserJson(user, token);
                return successResponse(res, data);
            });
        } catch (err) {
            console.error(err);
            return serverError(res);
        }
    }


};





