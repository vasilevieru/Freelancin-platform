var exports = module.exports = {}

exports.signup = function(req, res) {

    res.send({message: 'Registration page'});

};

exports.signin = function(req, res) {

    res.send({message: 'Login page'});

};

exports.dashboard = function(req, res) {

    res.send({message: 'You are logged'});

};

exports.logout = function(req, res) {

    req.session.destroy(function() {

        res.redirect('/api');

    });

};