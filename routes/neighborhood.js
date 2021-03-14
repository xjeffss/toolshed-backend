const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// router.get('/all', ctrl.city.getAll);
// router.get('/:neighborhood', ctrl.neighborhood.getLocalhoodById);
router.post('/addhood', ctrl.neighborhood.addHood)
module.exports = router;