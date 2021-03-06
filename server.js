require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const routes = require('./routes');
const constants = require('./constants');

const corsOptions = {
    origin: ['http://localhost:3000'],//<- frontend
    // origin: ['http://toolshed.surge.sh'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true, //allows session cookies to be sent back and forth
    optionsSuccessStatus: 200 //legacy browsers
  }

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use('/auth', routes.auth);
app.use('/neighborhood', routes.neighborhood);
app.use('/neighborhood/joinhood', routes.neighborhood);

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://toolshed.surge.sh");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   })
// const verifyToken = (req, res, next) => {
//     let token = req.headers['authorization'];
//     if(token){
//         token = token.substring(constants.BEARER_START_INDEX) //remove string Bearer from the token
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
//         if(err || !decodedUser){
//             return res.status(constants.UNAUTHORIZED).send(`ERROR: ${err}`);
//         }
//         req.user = decodedUser;//set the decoded payload to req object as the user information(username, id)

//         next();// for control to go to the next line of code
//     })
// }

// app.use('/post/all', routes.post);
// app.use('/post/city', routes.post);
app.use('/auth', routes.auth);

// app.use('/user', verifyToken, routes.user);
app.use('/user', routes.user);
app.use('/user/addtool',  routes.user);
app.use('/user/gettools', routes.user);
app.use('/user/gethood',  routes.user);
app.use('/neighborhood', routes.neighborhood);


app.use('/user/deletetool',  routes.user);
// app.use('/post', verifyToken, routes.post);

app.listen(process.env.PORT, () => {
    console.log(`I am listening on port ${process.env.PORT}`);
})