// controllers/index.js
const router = require('express').Router();
const models = require('.././models');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
// 3001/api/login,user,contact,comment,Trails
router.use('/api', apiRoutes);
// 3001/login,explore,about,contact,trails,
router.use('/', homeRoutes);

module.exports = router;
