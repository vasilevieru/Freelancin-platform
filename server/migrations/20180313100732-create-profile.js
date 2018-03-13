'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('profiles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'app_users',
                    key: 'id',
                    as: 'user_id',
                },
            },
            description: {
                type: Sequelize.STRING
            },
            hourly_rate: {
                type: Sequelize.FLOAT
            },
            skills: {
                type: Sequelize.STRING
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
    down: (queryInterface /*, Sequelize*/) => queryInterface.dropTable('profiles'),
};