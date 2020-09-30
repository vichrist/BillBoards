const categories = require("./categories");

module.exports = function(sequelize, DataTypes) {

    var Sub_Categories = sequelize.define("Sub_Categories", {

          name: {
            type: DataTypes.STRING,
          }
    });

    Sub_Categories.associate = function(models) {

      // a sub_category belongs to a category
      // the sub_category can't be created without a category due to the foreign key constraint
          Sub_Categories.belongsTo(models.Categories, {
              foreignKey: {
                  allowNull: false
              }
          });
      };
      
    return Sub_Categories;
};