'use strict';
module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
        name: DataTypes.STRING
    });
    role.associate = (models) => {
        // associations can be defined here
    };
    return role;
};