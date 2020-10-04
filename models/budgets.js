// budgets table
module.exports = function(sequelize, DataTypes) {
  const Budgets = sequelize.define("Budgets", {
    business: {
      type: DataTypes.BOOLEAN
    },
    budgetName: {
      type: DataTypes.STRING
    }
  });
  //a budget belongs to a user -- a budget cannot be created without a user due to the foreign key constraint
  Budgets.associate = function(models) {
    Budgets.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Budgets.hasMany(models.BudgetEntries, {
      onDelete: "cascade"
    });
  };
  return Budgets;
};
