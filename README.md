# Edubytes back-end

Server for the EduBytes project. This app is supposed to run in conjunction with the front-end. 

# Guide to setup

Clone Project & Install modules

```
git clone https://github.com/MustafaAP/edubytes-server.git
npm install
```
##### The Database can be run either on localhost using MongoDB Compass or on cloud using MongoDB Atlas


### MongoDB Atlas
1. Create a free account
2. Create a cluster in the database and set access IP to 0.0.0.0/0
3. Copy the connection string
4. Create an environment variable `.env` with and assign value ( `REACT_APP_MONGO_STRING = Your Connection String`)
5. Assign the variable the value of Connection string

### MongoDB Compass

1. Install the MongoDB client
2. Create a cluster in the database
3. Copy the connection string
4. Create an environment variable `.env` with and assign value ( `REACT_APP_MONGO_STRING = Your Connection String`)
5. Assign the variable the value of Connection string

##### Start the server
`nodemon ./index.js`


## API End Points
Listed down are all the important endpoints of this app

Currently the hosted API is https://edubytes-server.herokuapp.com/

The API is currently hosted on (website). If you want to test the API's by yourself , the easiest way would be to use the ThunderClient extension in VsCode

- Install ThunderClient Extension in VSCode
- Create Folder 
- Create a new Request in the Folder

Base URL for Authentication is `{API_URL}/api/auth`

#### Users

- `POST /createuser`
- `POST /login`
- `GET /user/:id`
- `GET /user`
- `PUT /edituser`

Base URL for Other is `{API_URL}/api/app`

### Posts

- `POST /blog`
- `GET /blog`
- `GET /blog/:id`
- `PUT /blog/:id`
- `DELETE /blog/:id`
- `GET /loadblog/:num`
- `POST /reply/`
- `POST /replies/:id`

## Resources

- `POST /resource`
- `GET /resource/:id`
- `DELETE /resource/:id`
- `PUT /resource/:id`
- `GET /resource`

## Ads

- `POST /ads`
- `PUT /ads/:id`
- `DELETE /ads/:id`
- `GET /ads/:id`
- `GET /allads/`


### DEMO
_View the demo in the client [repository](https://github.com/MustafaAP/edubytes-client)_


_Made with ❤️_








 
 
 
 









