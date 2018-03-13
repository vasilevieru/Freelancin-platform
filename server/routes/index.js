const models = require('../models/index');

const roleController = require('../controllers/role');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API!',
    }));
    app.post('/api/role', roleController.create);
    app.get('/api/role', roleController.list);
};
