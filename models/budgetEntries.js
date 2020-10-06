module.exports = function(sequelize, DataTypes) {
  const BudgetEntries = sequelize.define("BudgetEntries", {
    business: {
      type: DataTypes.BOOLEAN
    },
    budgetExpense: {
      type: DataTypes.BOOLEAN
    },
    amount: {
      type: DataTypes.DECIMAL
    },
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    }
    // dueDate: {
    //   type: DataTypes.DATETIME
    // }
  });

  BudgetEntries.associate = function(models) {
    BudgetEntries.belongsTo(models.Budgets, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return BudgetEntries;
};
