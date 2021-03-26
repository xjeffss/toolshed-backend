require('dotenv').config();

const User = require('../models').User;
const constants = require('../constants');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {

    // bcrypt.genSalt(10, (err, salt) => {
    //     if(err){
    //         res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    //     }
    //     bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
    //         if(err){
    //             res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    //         }
    //         req.body.password = hashedPwd;

            User.create(req.body)
            .then(newUser => {
                res.status(constants.SUCCESS).json(newUser);
            //     const token = jwt.sign(
            //         {
            //             username: newUser.username,
            //             id: newUser.id
            //         },
            //         process.env.JWT_SECRET,
            //         {
            //             expiresIn: "30 days"
            //         }
            //     )

            //     res.status(constants.SUCCESS).json({
            //         "token" : token,
            //         "user": newUser
            //     });
            // })
            // .catch(err => {
            //     console.log(err)
            //     res.status(constants.BAD_REQUEST).send(`ERROR: ${err}`);
            }
            )
    //     })
    // })
}

const login = (req, res) => {
    console.log(req.body)
    User.findOne({
        where: {
            username: req.body.username,
            // password: req.body.password,

        }
    })
    .then(foundUser => {
        if(req.body.password===foundUser.password){
            res.status(constants.SUCCESS).json(foundUser)
        //    bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
        //        console.log(match)
        //         if(match){
        console.log(foundUser.id)
                    // const token = jwt.sign(
                    //     {
                    //         username: foundUser.username,
                    //         id: foundUser.id
                    //     },
                    //     process.env.JWT_SECRET,
                    //     {
                    //         expiresIn: "30 days"
                    //     }
                    // )
                    // res.status(constants.SUCCESS).json({
                    //     "token" : token,
                    //     "user": foundUser,

                    // });
                // } 
                // else {
                //     res.status(constants.BAD_REQUEST).send(`ERROR: Incorrect Username/Password`);
                // }
            // })
        }
        else{
            res.status(constants.BAD_REQUEST).send(`ERROR: Incorrect Username/Password`);
        } console.log("boink")
    })
    .catch(err => {
        console.log(err)
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

const verifyUser = (req, res) => {
    console.log("token")
    User.findByPk(req.user.id, {
        attributes: ['id', 'firstName', 'lastName', 'username', 'email' ]
    })
    .then(foundUser => {
        res.status(constants.SUCCESS).json(foundUser);
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

module.exports = {
    signup,
    login,
    verifyUser
}
