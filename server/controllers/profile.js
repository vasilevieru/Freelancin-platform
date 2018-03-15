const Profile = require('../models').profile;

module.exports = {

    //view profile
    retrieve(req, res) {
        return Profile
            .findById(req.user.user_id)
            .then(profile => {
                if (!profile) {
                    return res.status(404).send({
                        message: 'Profile not found',
                    });
                }
                    return res.status(200).send(profile);
            })
            .catch(error => res.status(400).send(error));
    },

    //create a profile
    create(req, res) {
            return Profile
                .create({
                    user_id: req.user.id,
                    description: req.body.description,
                    hourly_rate: req.body.hourly_rate,
                    skills: req.body.skills,
                })
                .then(profile => res.status(201).send(profile))
                .catch(error => res.status(404).send(error));

    },
};