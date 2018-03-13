'use strict';
module.exports = (sequelize, DataTypes) => {
    const job = sequelize.define('job', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        budget: DataTypes.DOUBLE,
        status: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    });
    job.associate = (models) => {
        // associations can be defined here
        job.belongsTo(models.app_user, {
            foreignKey: 'user-id',
            onDelete: 'CASCADE',
        });
    };
    return job;
};