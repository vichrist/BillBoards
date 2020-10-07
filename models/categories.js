// categories table
module.exports = function(sequelize, DataTypes) {
  const Categories = sequelize.define("Categories", {
    business: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subcategoryName: {
      type: DataTypes.STRING
    },
    startPercentage: {
      type: DataTypes.FLOAT,
      validation: {
        min: 0,
        max: 100
      }
    },
    maxPercentage: {
      type: DataTypes.FLOAT,
      validation: {
        min: 0,
        max: 100
      }
    }
  });
  //categories belongs to a user -- a category cannot be created without a user due to the foreign key constraint
  Categories.associate = function(models) {
    Categories.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Categories;
};
 