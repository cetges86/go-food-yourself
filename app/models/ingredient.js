module.exports = function(sequelize, DataTypes) {
    const Ingredient = sequelize.define("Ingredients", {
      name: DataTypes.STRING
    });
    return Ingredient;
  };