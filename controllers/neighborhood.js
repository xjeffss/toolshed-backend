require('dotenv').config();
// const Post = require('../models').Post;
const User = require('../models').User;
const Tool = require('../models').Tool;
const Neighborhood = require('../models').Neighborhood;

const constants = require('../constants');

const addHood = (req, res) => {
    console.log(req.body)
        Neighborhood.create(req.body)
            .then(newHood => {
                res.send(newHood);
            })
        }
const getAll = (req, res) => {
    Neighborhood.findAll()
    .then(neighborhoods => {
        res.status(constants.SUCCESS).json(neighborhoods)
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

const getLocalhoodById = (req, res) => {
    let sort = 'DESC';
    if(req.query.sorted === 'asc')
        sort = 'ASC';
    
    Neighborhood.findByPk(req.params.neighborhood, {
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'body', 'img'],
                
            }
        ],
        order: [
            [{model: Post}, 'createdAt', sort]
        ]
    })
    .then(foundNeighborhood => {
        if(foundNeighborhood === null){
            res.status(constants.BAD_REQUEST).send('ERROR: Incorrect Neighborhood Id')
        }else{
            res.status(constants.SUCCESS).json(foundNeighborhood)
        }
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

module.exports = {
    addHood,
    getAll,
    getLocalhoodById
}