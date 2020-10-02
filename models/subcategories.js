// sub_categories table
module.exports = function(sequelize, DataTypes) {
  const SubCategories = sequelize.define("Sub_Categories", {
    name: {
      type: DataTypes.STRING
    }
  });
  //sub_categories belongs to a category -- a sub_category cannot be created without a category due to the foreign key constraint
  SubCategories.associate = function(models) {
    SubCategories.belongsTo(models.Categories, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return SubCategories;
};
