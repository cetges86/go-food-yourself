module.exports = function (sequelize, DataTypes) {
    const Association = sequelize.define("Association",{})

    // Association.associate = function (models) {
    //     console.log(models);
    //     Association.hasMany(models.Recipe, {
    //         foreignKey: { allowNull: false }
    //     })
    //     Association.hasMany(models.Ingredients, {
    //         foreignKey: { allowNull: false }
    //     })
    // }

    return Association;
}