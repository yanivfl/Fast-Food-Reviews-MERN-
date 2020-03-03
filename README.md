# Fast Food Reviews



## Design of Our Project:
## FrontEnd
The front-end is devided into 2 parts, the Login Page and the Main Page.
### Login Page:
has a SignIn feature for reguler users or users that want to log-in via facebook.
has a Register feature for new users, location is intigrated with google maps.
forms are created via Redux-form.

### Main Page:
with React-router, different components are rendered to the screen, depending on the users request.
the different pages that are displayed on the main page are:
1. settings page - a user can change his settings.
2. my reviews page - a user can see his own reviews and edit/delete them.
3. reviews page - a user can see reviews from restaurant/other users.
4. users page - a user can search for other users and see thier information and reviews. (search by name and location)
5. restaurant page - a user can search for restaurants and see thier information and reviews. (search by name and location)
6. review page - a user can submit or edit a review

all components are stateless, use saga to communicate with Back-end and Redux to communicate with Front-end. 
all files are resized so they can be rendered with ease.

## BackEnd: 
contains the following functionality:
1. models - model for review, restaurant, user.
2. apis - get and post requests.
3. additional function - utils.
4. uses multer to store files. (pictures)


## An Example For our Flow
register: <br>
1. users submits redux form (form has validation)
2. form sends an action, Saga catches the action and sends a post request to the BackEnd. the request is FormData. (might contain a file)
3. the backEnd valiates, is success then it respondes with new user information and a token.
4. the token is stored in the local storage and the user information is saved in redux state.
5. the main page is loaded with relevant user information.


## Bonus Features:
we intigrated with google maps and facebook.

## Additional Libraries
1. multer
2. react-dropZone
3. material-ui
4. react-facebook
5. redux-form

## Running Locally
Google Maps API Key: 
Create a new API key from the Google developer console, making sure that Maps JavaScript API has been enabled. Copy that key into your .env file creating an ENV var with the name REACT_APP_KEY

### To start the server:
1. start mongodb using mongod
2. node src\server\server.js # backend
3. npm run dev # frontend
or
1. click on "load" bash file.

 
This project is based on [this](https://github.com/wix-incubator/flickr-gallery-exam) code.