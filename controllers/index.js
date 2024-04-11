// controllers/index.js
const router = require('express').Router();
const models = require('.././models');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
