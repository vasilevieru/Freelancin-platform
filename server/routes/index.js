const app_userController = require('../controllers/app_user');
const profileController = require('../controllers/profile');
const jobController = require('../controllers/job');
const authController = require('../controllers/auth');

var role_id;


module.exports = (app, passport) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API!',
    }));

    //freelancers registration
    app.post('/api/freelancers/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/dashboard',
        failureRedirect: '/api/freelancers/signup'
    }));

    app.post('/api/freelancers/signin', passport.authenticate('local-signin', {
            successRedirect: '/api/dashboard',
            failureRedirect: '/api/freelancers/signin'
        }
    ));

    //employers registration
    app.post('/api/employers/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/dashboard',
        failureRedirect: '/api/employers/signup'
    }));

    app.post('/api/employers/signin', passport.authenticate('local-signin', {
            successRedirect: '/api/dashboard',
            failureRedirect: '/api/employers/signin'
        }
    ));

    app.post('/api/managers/signin', passport.authenticate('local-signin', {
            successRedirect: '/api/dashboard',
            failureRedirect: '/api/managers/signin'
        }
    ));

    app.post('/api/freelancers/profile', isLoggedIn, function (req, res) {
        if (role_id === 4) {
            profileController.create(req, res);
        } else
            res.send({message: 'You do not have permission'});
    });

    app.get('/api/profile/:user_id', isLoggedIn, function (req, res) {
        if (role_id === 4) {
            profileController.retrieve(req, res);
        } else
            res.send({message: 'You do not have permission'});
    });

    app.get('/api/jobs', jobController.retrieveAvailable);

    //employers
    app.post('/api/jobs', isLoggedIn, jobController.create);

    app.get('/api/jobs/:user_id', isLoggedIn, function (req, res) {
        if (role_id === 3) {
            jobController.retrieve(req, res);
        }
        else {
            res.send({message: 'You do not have permission'});
        }
    });

    app.get('/api/freelancers', app_userController.retrieve);


    /*staff*/
    //admin
    app.post('/api/managers/signup', isLoggedIn, passport.authenticate('local-signup', {
                successRedirect: '/api/dashboard',
                failureRedirect: '/api/managers/signup'
    }));

    //manager and admin
    app.patch('/api/:job_id', isLoggedIn, function (req, res) {
        if (role_id === 2 || role_id === 1) {
            jobController.update(req, res);
        }else
            res.send({message: 'You do not have permission'});
    });

    app.get('/api/freelancers/list', isLoggedIn, function (req, res) {
        if (role_id === 2 || role_id === 1) {
            app_userController.list(req, res)
        } else
            res.send({message: 'You do not have permission'});
    });

    app.patch('/api/freelancers/:user_id', isLoggedIn, function (req, res) {
        if (role_id === 2 || role_id === 1) {
            app_userController.update(req, res);
        } else
            res.send({message: 'You do not have permission'});
    });

    app.get('/api/logout', authController.logout);


    //guest
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

        role_id = null;
        role_id = request.user.role_id;
        console.log('Role ID: ' + role_id);
        return request.user && request.user.id.toString() || false;
    }

};
