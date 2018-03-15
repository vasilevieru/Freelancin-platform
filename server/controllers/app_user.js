const App_User = require('../models').app_user;
const job = require('../models').job;

module.exports = {

    //get all
    retrieve(req, res){
        return App_User
            .findAll({
                include: [
                    {
                        model: job,
                        as: 'jobs',
                    }
                ],
            })
            .then(jobs => res.status())






        /*.findById(req.params.user_id,{
            include: [
                {
                    model: job,
                    as:'jobs',
                }
            ],
        })

        .then(app_user => {
            if(!app_user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return res.status(200).send(app_user);
        })
        .catch(error => res.status(400).send(error));*/
    },

    //create a employer
    create_employer(req, res) {
        return App_User
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                status: 'approved',
                password: req.body.password,
                role_id: 3,
            })
            .then(app_user => res.status(201).send(app_user))
            .catch(error => res.status(404).send(error));
    },

    //create a freelancer
    create_freelancer(req, res) {
        return App_User
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                status: 'new',
                password: req.body.password,
                role_id: 4,
            })
            .then(app_user => res.status(201).send(app_user))
            .catch(error => res.status(404).send(error));
    },

    //create a manager
    create_manager(req, res) {
        return App_User
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                status: 'approved',
                password: req.body.password,
                role_id: 2,
            })
            .then(app_user => res.status(201).send(app_user))
            .catch(error => res.status(404).send(error));
    },

    //modify
};