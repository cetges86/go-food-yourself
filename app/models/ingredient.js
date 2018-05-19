module.exports = function (sequelize, DataTypes) {
  const Ingredient = sequelize.define("Ingredients", {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    important: DataTypes.BOOLEAN
  });

  Ingredient.associate = function (models) {
    console.log(models)
    Ingredient.belongsToMany(models.Recipe, {
      through: {model: models.Association},
      foreignKey: 'recipe_id'
    });
  };

  return Ingredient;
};