const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// router.get('/all', ctrl.city.getAll);
router.post('/addhood', ctrl.neighborhood.addHood)
router.post('/joinhood', ctrl.neighborhood.joinHood)
router.post('/leavehood', ctrl.neighborhood.leaveHood)
router.get('/:neighborhood', ctrl.neighborhood.getLocalToolsById);
module.exports = router;