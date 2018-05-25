module.exports = function(sequelize, DataTypes) {
    const Recipe = sequelize.define("Recipe", {
      name: DataTypes.STRING,
      numberOfIng: DataTypes.INTEGER,
      link: DataTypes.STRING,
      ImgURL: DataTypes.STRING
    }, {
      timestamps: false
    });

    Recipe.associate = function (models) {
      Recipe.belongsToMany(models.Ingredients, {
        through: 'ingredient_recipes',
        foreignKey: 'ingredient_id'
      });
    };
    return Recipe;
  };