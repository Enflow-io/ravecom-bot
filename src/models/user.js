'use strict';
module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('User', {
		username: DataTypes.STRING,
		language: DataTypes.STRING,
		tg_user: DataTypes.INTEGER,
		data: DataTypes.JSON,
		visitedAt: DataTypes.DATE,
		isMessaged: DataTypes.BOOLEAN
	}, {});



	return User;
};
