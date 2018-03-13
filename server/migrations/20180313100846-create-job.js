'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('jobs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            budget: {
                type: Sequelize.DOUBLE
            },
            status: {
                type: Sequelize.STRING
            },
            user_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references:{
                    model: 'app_users',
                    key: 'id',
                    as: 'user_id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface /*, Sequelize*/) => queryInterface.dropTable('jobs'),
};