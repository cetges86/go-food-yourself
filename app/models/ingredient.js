module.exports = function (sequelize, DataTypes) {
  const Ingredient = sequelize.define("Ingredients", {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    category: DataTypes.STRING
  }, {
      timestamps: false
    });

  Ingredient.associate = function (models) {
    Ingredient.belongsToMany(models.Recipe, {
      through: 'ingredient_recipes',
      foreignKey: 'recipe_id'
    });
  };

  return Ingredient;
};