const app_userController = require('../controllers/app_user');
const profileController = require('../controllers/profile');
const jobController = require('../controllers/job');
const authController = require('../controllers/auth');

var role_id;

module.exports = (app, passport) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API!',
    }));

    //freelancers
    app.post('/api/freelancers/signin', passport.authenticate('local-signin', {
            successRedirect: '/api/dashboard',
            failureRedirect: '/api/freelancers/signin'
        }
    ));

    app.post('/api/freelancers/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/dashboard',
        failureRedirect: '/api/freelancers/signup'
    }));

    app.post('/api/freelancers/profile', profileController.create);

    app.get('/api/profile/:user_id', isLoggedIn, profileController.retrieve);

    app.get('/api/jobs', isLoggedIn, jobController.retrieveAvailable);


    //employers
    app.post('/api/employers/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/dashboard',
        failureRedirect: '/api/employers/signup'
    }));

    app.post('/api/jobs', jobController.create);

    app.get('/api/jobs/:user_id', jobController.retrieve);

    //app.get('/api/freelancers', app_userController.retrieve);

    app.post('/api/employers/signin', passport.authenticate('local-signin', {
            successRedirect: '/api/dashboard',
            failureRedirect: '/api/employers/signin'
        }
    ));

    /*staff*/
    //admin
    app.post('/api/managers/registration', passport.authenticate('local-signup', {
        successRedirect: '/api/dashboard',
        failureRedirect: '/api/managers/signup'
    }));

    //manager and admin
    app.patch('/api/:job_id', jobController.update);

    app.get('/api/freelancers/list', isLoggedIn, app_userController.list);

    app.patch('/api/freelancers/:user_id', app_userController.update);

    app.get('/api/logout', authController.logout);

    //guest
    app.get('/api/freelancers', app_userController.retrieve);

  //  app.get('/api/jobs', jobController.retriveAvailable);


    app.get('/api/jobs/:user_id', isLoggedIn, jobController.retrieve);

    app.get('/api/dashboard', isLoggedIn, authController.dashboard);


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            //res.locals.user = req.session.user;
            get_user_id(req, res);

            return next();
        }
        res.status(401).send({message: 'User not authenticated'});
    }

    function get_user_id(request, response) {

        role_id = request.user.role_id;
        console.log(request.user);
        return request.user && request.user.id.toString() || false;
    }

};
