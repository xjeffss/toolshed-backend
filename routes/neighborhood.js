const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// router.get('/all', ctrl.city.getAll);
router.post('/addhood', ctrl.neighborhood.addHood)
router.post('/joinhood', ctrl.neighborhood.joinHood)
// router.get('/:neighborhood', ctrl.neighborhood.getLocalhoodById);
module.exports = router;