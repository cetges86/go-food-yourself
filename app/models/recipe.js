module.exports = function(sequelize, DataTypes) {
    const Recipe = sequelize.define("Recipe", {
      name: DataTypes.STRING,
      numberOfIng: DataTypes.INTEGER,
      link: DataTypes.STRING,
      ImgURL: DataTypes.STRING
    });

    Recipe.associate = function (models) {
      Recipe.belongsToMany(models.Ingredients, {
        through: {model: models.Association},
        foreignKey: 'ingredient_id'
      });
    };
    return Recipe;
  };