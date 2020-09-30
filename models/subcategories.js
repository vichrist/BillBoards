// sub_categories table 
module.exports = function(sequelize, DataTypes) {
  var Sub_Categories = sequelize.define("Sub_Categories", {
    name: {
      type: DataTypes.STRING, 
    } 
  });
  //sub_categories belongs to a category -- a sub_category cannot be created without a category due to the foreign key constraint 
  Sub_Categories.associate = function(models) {
    Sub_Categories.belongsTo(models.Categories, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Sub_Categories; 
};
