module.exports = function (sequelize, DataTypes) {
  const Ingredient = sequelize.define("Ingredients", {
    name: {type:DataTypes.STRING,
    unique:true},
    category: DataTypes.STRING,
    important: DataTypes.BOOLEAN
  }, {
    timestamps: false
  });

  Ingredient.associate = function (models) {
    console.log(models)
    Ingredient.belongsToMany(models.Recipe, {
      through: 'ingredient_recipes',
      foreignKey: 'recipe_id'
    });
  };

  return Ingredient;
};