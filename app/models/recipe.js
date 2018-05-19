module.exports = function(sequelize, DataTypes) {
    const Recipe = sequelize.define("Recipe", {
      name: DataTypes.STRING,
      numberOfIng: DataTypes.INTEGER,
      link: DataTypes.STRING,
      ImgURL: DataTypes.STRING
    });
    return Recipe;
  };