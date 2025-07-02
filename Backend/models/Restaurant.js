// models/Restaurant.js
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: DataTypes.STRING,
    image: DataTypes.STRING, // optional
    description: DataTypes.TEXT,
  });

  return Restaurant;
};
