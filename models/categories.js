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

    Categories.associate = function(models) {

      //  a category belongs to a user
      // a category can't be created without a user due to the foreign key constraint
          Categories.belongsTo(models.User, {
              foreignKey: {
                  allowNull: false
              }
          });
      };
      
    return Categories;
};