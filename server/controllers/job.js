const Job = require('../models').job;

module.exports = {

    //create job
    create(req, res){
        return Job
            .create({
                title: req.body.title,
                description: req.body.description,
                budget: req.body.budget,
                status: 'new',
                user_id: null,
            })
            .then(job => res.status(201).send(job))
            .catch(error => res.status(404).send(error));
    },

    //view posted jobs
    retrieve(req, res){
        return Job
            .findById(req.params.user_id)
            .then(jobs => {
                if(!jobs){
                    return res.status(404).send({
                        message: 'Jobs not found',
                    });
                }
                return res.status(200).send(jobs);
            })
            .catch(error => res.status(400).send(error));
    },

    retrieveAvailable(req, res){
        return Job
            .find({
                where: {
                    status: 'approved',
                }
            })
            .then(jobs => {
                if(!jobs){
                    return res.status(404).send({
                        message: 'Jobs not found',
                    });
                }
                return res.status(200).send(jobs);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res){
        return Job
            .find({
                where:{
                    id:req.params.job_id,
                },
            })
            .then(jobs => {
                if(!jobs){
                    return res.status(404).send({
                        message: 'Job not found',
                    });
                }
                return jobs
                    .update(req.body, {fields: Object.keys(req.body)})
                    .then(updatedJob => res.status(200).send(updatedJob))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error))
    }

};