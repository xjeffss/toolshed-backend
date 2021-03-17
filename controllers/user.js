require('dotenv').config();

const User = require('../models').User;
const Tool = require('../models').Tool;
const Neighborhood = require('../models').Neighborhood;
const LocalHood = require('../models').LocalHood;

// const Post = require('../models').Post;

const constants = require('../constants');

const addTool = (req, res) => {
    console.log(req.body)
            Tool.create(req.body)
            //     {
            //     where: {
            //         userId: req.userId
            //     },
            //     returning: true
            // })
            .then(newTool => {
                res.send(newTool);
            })
}
const getTool = (req, res) => {   
    console.log("what's up")
    Tool.findAll( {
        where:
        {userId: req.body.id},
        // include: [
        //     {
        //         model: Tool,
        //         attributes: ['id', 'toolName', 'userId']
        //     }
        // ],
        // attributes: ['id', 'firstName', 'username',  'createdAt', 'email'],

    })
    .then(userTool => {
        res.send(userTool)
    })
    // .catch(err => {
    //     res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    // })
}

const getProfile = (req, res) => {
    let sort = 'DESC';
    if(req.query.sorted === 'asc')
        sort = 'ASC';
    
    User.findByPk(req.user.id, {
        include: [
            {
                model: Neighborhood,
                attributes: ['id', 'neighborhoodId']
            },
            {
                model: Tool,
                attributes: ['id', 'toolName']
            }
        ],
        attributes: ['id', 'firstName', 'username',  'createdAt', 'email'],
        order: [
            [{model: Tool}, 'createdAt', sort]
        ]
    })
    .then(userProfile => {
        res.status(constants.SUCCESS).json(userProfile)
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

const editProfile = (req, res) => {
    User.update(req.body, {
        where: {
            id: req.user.id
        },
        returning: true
    })
    .then(() => {
        User.findByPk(req.user.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', ]
                }
            ],
            attributes: ['id', 'firstName', 'username', 'createdAt', 'email']
        })
        .then(userProfile => {
            res.status(constants.SUCCESS).json(userProfile)
        })
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}
const getLocalhoodById = (req, res) => {
    console.log("local hood")
    let sort = 'DESC';
    if(req.query.sorted === 'asc')
        sort = 'ASC';
    
    LocalHood.findAll( {
        where:
        {userId: req.body.id},
        include: [
            {
                model: Neighborhood,
                attributes: ['id', 'neighborhoodName'],
            },
        ],

    })
    .then(foundNeighborhood => {console.log(foundNeighborhood)
        // if(foundNeighborhood === null){
        //     res.status(constants.BAD_REQUEST).send('ERROR: Incorrect Neighborhood Id')
        // }else
        {
            res.status(constants.SUCCESS).json(foundNeighborhood)
        }
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}
module.exports = {
    addTool,
    getTool,
    getProfile,
    editProfile,
    getLocalhoodById
}