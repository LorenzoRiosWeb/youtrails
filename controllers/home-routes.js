const router = require('express').Router();
const { User, Trails, Comments } = require('../models');
const auth = require('../utils/auth'); 

router.get('/', async (req, res) => {
    try {
        const trailsData = await Trails.findAll({ 
        });
        const trails = trailsData.map(trail => trail.get({ plain: true }));
        
        res.render('explore', {
            logged_in: req.session.logged_in, 
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup',  (req, res)=> {
    try {
        res.render('signUp');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
router.get('/about',  (req, res)=> {
    try {
        res.render('about');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
router.get('/contact',  (req, res)=> {
    try {
        res.render('contact');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
router.get('/trails',  (req, res)=> {
    try {
        res.render('trails');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/trails/:id', async (req, res) => {
    try {
        const trail = await Trails.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comments, include: [{ model: User, attributes: ['user_name'] }] }
            ]
        });
        const singleTrail = trail.get({ plain: true });
        
        res.render('trail', {
            singleTrail,
            logged_in: req.session.logged_in, 
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err, message: "Something went wrong." });
    }
});

module.exports = router;
