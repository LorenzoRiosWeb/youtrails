const router = require('express').Router();
const { User } = require('../models'); 

router.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }
        const dbUserData = await User.findAll({}); 
        const users = dbUserData.map(user => user.get({ plain: true })); 
        res.render('explore', {
            users, 
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.params.id, {}); 
        const user = dbUserData.get({ plain: true });
        res.render('user', { user, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;