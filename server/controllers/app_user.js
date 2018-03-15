const App_User = require('../models').app_user;
const job = require('../models').job;

module.exports = {

    //get all
    list(req, res) {
        return App_User
            .findAll({
                where: {
                    role_id: 4,
                }
            })
            .then(users => {
                if(!users){
                    return res.status(404).send({
                        message: 'Users not found',
                    });
                }
                return res.status(200).send(users);
            })
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        return App_User
            .findAll({
                where: {
                    status: 'approved',
                }
            })
            .then(users => {
                if(!users){
                    return res.status(404).send({
                        message: 'Users not found',
                    });
                }
                return res.status(200).send(users);
            })
            .catch(error => res.status(400).send(error));
    },

    //modify
    update(req, res){
        return App_User
            .find({
                where:{
                    id:req.params.user_id,
                },
            })
            .then(users => {
                if(!users){
                    return res.status(404).send({
                        message: 'User not found',
                    });
                }
                return users
                    .update(req.body, {fields: Object.keys(req.body)})
                    .then(upatedUser => res.status(200).send(upatedUser))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error))
    }
};