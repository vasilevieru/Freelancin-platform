const session = require('express-session');
const roleController = require('../controllers/role');
const app_userController = require('../controllers/app_user');
const profileController = require('../controllers/profile');
const jobController = require('../controllers/job');
const authController = require('../controllers/auth');
var node_acl = require('acl');

var status = 'new';
exports.status = status;


module.exports = (app, passport) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API!',
    }));
    app.post('/api/role', roleController.create);
    app.get('/api/role', isLoggedIn, roleController.list);
    app.get('/api/profile/:user_id', isLoggedIn, profileController.retrieve);
    app.get('/api/employers', isLoggedIn, app_userController.retrieve);
    app.get('/api/jobs/:user_id', isLoggedIn, jobController.retrieve);
    app.get('/api/jobs', isLoggedIn, jobController.retriveAvailable);
    //app.get('/api/employers/signup', authController.signup);
    app.get('/api/dashboard',isLoggedIn, authController.dashboard);
    app.get('/api/employers/logout',authController.logout);
    app.get('/api/freelancers/logout',authController.logout);

    app.post('/api/employers/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/dashboard',
        failureRedirect: '/api/employers/signup'
    }));

    app.post('/api/employers/signin', passport.authenticate('local-signin', {
            successRedirect: '/api/dashboard',
            failureRedirect: '/api/employers/signin'
        }
    ));

    app.post('/api/freelancers/signin', passport.authenticate('local-signin', {
            successRedirect: '/api/dashboard',
            failureRedirect: '/api/freelancers/signin'
        }
    ));

    app.post('/api/freelancers/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/dashboard',
        failureRedirect: '/api/freelancers/signup'
    }));

    app.post('/api/freelancers/registration', app_userController.create_freelancer);
    app.post('/api/managers/registration', app_userController.create_manager);
    app.post('/api/freelancers/profile', profileController.create);
    app.get('/api/employers/signin',authController.signin);
    //app.post('/api/jobs', jobController.create);
    //app.post('/api/login',)

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            res.locals.user = req.session.user
            return next();
        }
        res.send(401, 'User not authenticated');
    }
};
