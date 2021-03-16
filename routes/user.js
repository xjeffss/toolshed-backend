const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


router.get('/profile', ctrl.user.getProfile);
router.put('/profile', ctrl.user.editProfile);
router.put('/profile', ctrl.user.editProfile);
router.post('/addtool', ctrl.user.addTool);
router.post('/gettools', ctrl.user.getTool);
router.post('/gethood', ctrl.user.getLocalhoodById);

module.exports = router;