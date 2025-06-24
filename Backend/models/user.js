// user.js - dummy content
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
       allowNull: true, 
    },
    provider: {
      type: DataTypes.STRING,
      defaultValue: 'local',
    },
  });

  return User;
};