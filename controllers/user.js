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
const getUsers = (req, res) => {
    console.log(req.body)
    User.findAll({
        where:
        {
            id: req.body.id
        },
        include: [
        {
            model: Tool,
            attributes: ['toolName']
        },
    ]
    }).then(getUser => {
        res.status(constants.SUCCESS).json(getUser);
    })
}
const getTool = (req, res) => {   
    console.log("gettool")
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
const deleteTool = (req, res) => {
    console.log(req.body.toolId)
    Tool.findByPk(req.body.toolId)
    .then(foundTool => {
        if(foundTool.id === req.body.toolId){
            Tool.destroy({
                where: {
                    id:req.body.toolId
                }
            })
        } else {
            res.status(constants.BAD_REQUEST).send(`ERROR: Tool not found`);
        }
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
    deleteTool,
    getTool,
    getProfile,
    getUsers,
    getLocalhoodById
}