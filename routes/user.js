const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');



router.post('/addtool', ctrl.user.addTool);
router.post('/gettools', ctrl.user.getTool);
router.post('/deletetool', ctrl.user.deleteTool)
router.post('/gethood', ctrl.user.getLocalhoodById);

module.exports = router;