// const Post = require('../models').Post;
const City = require('../models').neighborhood;

const constants = require('../constants');

const getAll = (req, res) => {
    City.findAll()
    .then(cities => {
        res.status(constants.SUCCESS).json(cities)
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

const getLocalhoodById = (req, res) => {
    let sort = 'DESC';
    if(req.query.sorted === 'asc')
        sort = 'ASC';
    
    City.findByPk(req.params.city, {
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
    .then(foundCity => {
        if(foundCity === null){
            res.status(constants.BAD_REQUEST).send('ERROR: Incorrect City Id')
        }else{
            res.status(constants.SUCCESS).json(foundCity)
        }
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

module.exports = {
    getAll,
    getLocalhoodById
}