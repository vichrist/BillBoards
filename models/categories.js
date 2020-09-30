// categories table 
module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    name: {
      type: DataTypes.STRING, 
    }, 
    total: {
      type: DataTypes.DECIMAL, 
    }, 
    percentage: {
      type: DataTypes.DECIMAL, 
    }
  });
//categories belongs to a user -- a category cannot be created without a user due to the foreign key constraint 
  Categories.associate = function(models) {
    Categories.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Categories; 
};

