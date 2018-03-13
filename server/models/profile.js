'use strict';
module.exports = (sequelize, DataTypes) => {
    const profile = sequelize.define('profile', {
        user_id: DataTypes.INTEGER,
        description: DataTypes.STRING,
        hourly_rate: DataTypes.FLOAT,
        skills: DataTypes.STRING
    });
    profile.associate = (models) => {
        // associations can be defined here
        profile.belongsTo(models.app_user,{
            onDelete: 'CASCADE',
            foreignKey: 'user_id',
        });
    };
    return profile;
};