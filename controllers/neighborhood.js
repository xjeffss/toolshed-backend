require('dotenv').config();
// const Post = require('../models').Post;
const User = require('../models').User;
const Tool = require('../models').Tool;
const Neighborhood = require('../models').Neighborhood;
const LocalHood = require ('../models').LocalHood;

const constants = require('../constants');

const addHood = (req, res) => {
    console.log(req.body)
        Neighborhood.create(req.body)
            .then(newHood => {
                res.status(constants.SUCCESS).json(newHood);
            })
        }

const joinHood = (req, res) => {
    console.log(req.body)
    Neighborhood.findAll({
        where: {
            neighborhoodName: req.body.neighborhoodName
        }
    })
        .then( 
            foundHood => {console.log(req.body)
            if(req.body.neighborhoodPasscode==foundHood[0].dataValues.neighborhoodPasscode)
                    LocalHood.create({
                        neighborhoodId:foundHood[0].dataValues.id,
                        userId: req.body.userId
                    })
             else(res.send("wrong passcode"))       
            .then(joinHood => {
                res.status(constants.SUCCESS).json(joinHood)        
            })
        })
        }
const leaveHood = (req, res) => {
    console.log(req.body)
    LocalHood.findByPk(req.body.neighborhoodId)
    .then(
            LocalHood.destroy({
                where: {
                    neighborhoodId:req.body.neighborhoodId,
                    userId:req.body.userId
                }
            })
        
    )
    }
        

// const getAll = (req, res) => { console.log(req.params.neighborhoodId)
//     Neighborhood.findAll({
//         where:{
//             neighborhoodId:req.params.neighborhoodId
//         }
//     })
//     .then(neighborhoods => {
//         res.status(constants.SUCCESS).json(neighborhoods)
//     })
//     .catch(err => {
//         res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
//     })
// }

const getLocalToolsById = (req, res) => {
    console.log(req.params.neighborhood)
    User.findAll({

        include: [
            {
                model:Neighborhood,
                attributes: ['id', 'neighborhoodName'],

            },
            {
                model:LocalHood,
                attributes: [ 'userId', 'neighborhoodId'],
                where: {
                    neighborhoodId: req.params.neighborhood
                },
            } ,
            {
            model: Tool,
            attributes: ['id', 'toolName']
            }

        ],
    })
    .then(foundLocalTools => {console.log(foundLocalTools)
        // foundLocalTools.map({

        // if(foundNeighborhood === null){
        //     res.status(constants.BAD_REQUEST).send('ERROR: Incorrect Neighborhood Id')
        // }else
        {
            res.status(constants.SUCCESS).json(foundLocalTools)
        }
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

module.exports = {
    joinHood,
    addHood,
    // getAll,
    getLocalToolsById,
    leaveHood
}