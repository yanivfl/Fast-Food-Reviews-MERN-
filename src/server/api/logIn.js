const multer = require('multer');
const fs = require('fs');
const User = require('../model/user');
const UserSession = require('../model/userSession');
const { serverError, userError, successResponse } = require('../utils/serverResponses');
const { getUserJson, getFacebookName, createNewUser, succLoginResponse  } = require('../utils/loginHelpers');



// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const dir = 'uploads';
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
      }
      cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });


module.exports = (app) => {


  /*
  * see ff_reviews_api.xlsx yanivvvvvvvvv
   */
  app.post('/api/account/signup', upload.single('avatar'),  (req, res, next) => {
    try{
      const { body, file } = req;
      const {
        password,
        user_name,
        location,
      } = body;

      const avatar_path = file ? file.path : '';
      // validate request
      if ( !user_name || !location || !password )
        return userError(res, 'Error: one of the following fields are blank: user_name, password, location');


      //check if user already exists by user_id
      User.find({
        user_name: user_name
      }, (err, previousUsers) => {
        if (err) {
          console.error(err);
          return serverError(res);
        } else if (previousUsers.length > 0) {
          return userError(res, 'Error: Account already exist.');
        }

        // save user
        console.log('creating new user');
        var newUser = new User();
        newUser = createNewUser(newUser,
            user_name,
            user_name,
            newUser.generateHash(password),
            location,
            false,
            avatar_path
        );
        if(!newUser){
          return serverError(res);
        }
        newUser.save((err, user) => {
          if (err) {
            console.error(err);
            return serverError(res);
          }
          console.log('validation succeeded, creating token');
          console.log(user);
          // validation succeeded, create token
          return succLoginResponse(user,res);
        });
      });

    } catch(err){
      console.error(err);
      return serverError(res);
    }
  });

  /*
  * req: {user_name: str, password: str}
  */
  app.post('/api/account/signin', (req, res, next) => {
    try{
      const { body } = req;
      const {
        user_name,
        password
      } = body;

      // validate request
      if (!user_name || !password ) {
        return userError(res, 'Error: one of the following fields are blank: user_name, password');
      }

      //find user by user_id and validate password
      User.find({
        user_name: user_name
      }, (err, users) => {
        if (err) {
          console.error(err);
          return serverError(res);
        }
        if (users.length >1) {
          console.error('more than 1 user with the same ID in the db!!!');
          return serverError(res);
        }
        if (users.length === 0) {
          return userError(res, 'Error: username or password are incorrect');
        }

        const user = users[0];
        if (!user.validPassword(password)) {
          return userError(res, 'Error: username or password are incorrect');
        }

        console.log('validation succeeded, creating token');
        // validation succeeded, create token
        return succLoginResponse(user,res);
        });
    } catch(err){
      console.error(err);
      return serverError(res);
    }
  });

  /*
  * req: {user_name: str, password: str}
  */
 app.post('/api/account/signin_ext_acc', (req, res, next) => {
  try{
    const { body } = req;
    const {
      user_id,
      email,
      avatar
    } = body;

    // validate request
    if (!email || !user_id ||!avatar)
        return userError(res, 'Error: one of the following fields are blank: email, user_id, avatar');


    //find user by user_id, if not found then sign up
    User.find({
      user_id: user_id
    }, (err, users) => {
      if (err) {
        console.error(err);
        return serverError(res);
      }
      if (users.length >1) {
        console.error('more than 1 user with the same ID in the db!!!');
        return serverError(res);
      }

      const is_newUser = users.length === 0;
      if(is_newUser){
        //creating new user
        console.log('signup new user!');
        var newUser = new User();
        newUser = createNewUser(newUser,
            getFacebookName(email),
            user_id,
            '',
            "google_maps_location", //TODO google maps change to location temp plaster
            true,
            null,
            avatar ); 
        if(!newUser){
          return serverError(res);
        }
       newUser.save((err, user) => {
            if (err) {
              console.error(err);
              return serverError(res);
            }
            console.log('validation succeeded, creating token');
            // validation succeeded, create token
            return succLoginResponse(user,res);
          });
      }
      else{
        //user exists, logging in...
        console.log('sign in user!');
        const user = users[0];
        console.log('validation succeeded, creating token');
        // validation succeeded, create token
        return succLoginResponse(user,res);
      }
      });
  } catch(err){
    console.error(err);
    return serverError(res);
  }
});

/*
  * req: {}
  */
  app.get('/api/account/is_user_name_exist', (req, res) => {
    try{
        const {query} = req;
        const {name} = query;
        const user_name = name? name : '';

        console.log(`name is: ${user_name}`);
        const find_query = {
            user_name: {
                $regex: user_name,
                '$options': 'i'
            },
        };



      //find user by user_id and validate password
      User.find(find_query, null, {sort: {'date': -1}, limit: 20}, (err, users) => {
        if (err) {
          console.error(err);
          return serverError(res);
        }

        const users_names = users.map(user => user.user_name);
        console.log('get succeeded, returns all users name');
        // validation succeeded, create token
        return successResponse(res,users_names);
        });
    } catch(err){
      console.error(err);
      return serverError(res);
    }
  });


  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
  
    // Verify the token is one of a kind and it's not deleted.
  
    UserSession.find({
      _id: token,
    }, (err, sessions) => {
      if (err) {
        console.error(err);
        return serverError(res);
      }
  
      if (sessions.length !== 1) {
        console.error('Error: Invalid session');
        return userError(res, 'Error: Invalid session');
      } else {
          User.find({
            _id: sessions[0].userId
          }, (err, users) => {
            if (err) {
              console.error(err);
              return serverError(res);
            }
            if (users.length >1) {
              console.error('more than 1 user with the same ID in the db!!!');
              return serverError(res);
            }
            if (users.length === 0) {
              return userError(res, 'Error: username or password are incorrect');
            }
            const user = users[0];
            const data = getUserJson(user,token);
            return successResponse(res,data)
          });
       }
    });
  });

  /*
  * header: token: str
  */
  app.post('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and delete it.
    UserSession.deleteOne({
      _id: token,
    }, (err) => {
      if (err) {
        console.error(err);
        return serverError(res);
      }

      const data = {success: true, message: 'logged out successfully'};
      return successResponse(res, data);
    });
  });
};
