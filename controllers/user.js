require('dotenv').config();

const User = require('../models').User;
const Tool = require('../models').Tool;
const Neighborhood = require('../models').Neighborhood;
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

module.exports = {
    addTool,
    getProfile,
    editProfile
}