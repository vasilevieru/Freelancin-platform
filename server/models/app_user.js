'use strict';
module.exports = (sequelize, DataTypes) => {
    const app_user = sequelize.define('app_user', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        status: DataTypes.STRING,
        password: DataTypes.STRING,
        role_id: DataTypes.INTEGER
    });
    app_user.associate = (models) => {
        // associations can be defined here
        app_user.belongsTo(models.role, {
            foreignKey: 'role_id',
            onDelete: 'CASCADE',
        });
    };
    return app_user;
};