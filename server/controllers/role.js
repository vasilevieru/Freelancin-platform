const Role = require('../models').role;

module.exports = {

    //get all roles
    list(req, res){
        return Role
            .all()
            .then(role => res.status(200).send(role))
            .catch(error => res.status(400).send(error));
    },

    //create a role
    create(req, res) {
        return Role
            .create({
                name: req.body.name,
            })
            .then(role => res.status(201).send(role))
            .catch(error => res.status(404).send(error));
    },
};