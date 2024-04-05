const router = require('express').Router();
const { User } = require('../models/User');
// Getting the explore page 
router.get('/', async (req, res) =>{
    try{
        if(!req.session.loggedIn){
            res.redirect('/login')
            return;
        }
        const dbUserData = await user.findAll({
            include:[
                {
                model: user,
                attributes:['filename', 'description'],
                },
            ],
    
        })
        const user = dbUserData.map((user)=>{
            user.get({plain:true})
        });
        res.render('explore', {
            explore,
            trails,
            loggedIn:req.session.loggedIn,
        });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

// grabbing specific user
router.get('/user/:id', async (req,res) =>{
    try{
        const dbUserData = await User.findByPK(req.params.id,{
            include:[
                {
                    model: User,
                    attribute:[
                        'id',
                        'name',
                        'email',
                        'password',
                        'filename',
                        'description'
                    ],
                },
            ],
        });
        const user = dbUserData.get({plain: true});
        res.render('user',{user, loggedIn: req.session.loggedIn});
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/login', (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/')
        return;
    }
    res.render('login');
})