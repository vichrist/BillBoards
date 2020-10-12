module.exports = function(sequelize, DataTypes) {
  const BudgetEntries = sequelize.define("BudgetEntries", {
    business: {
      type: DataTypes.BOOLEAN
    },
    isExpense: {
      type: DataTypes.BOOLEAN
    },
    amount: {
      type: DataTypes.FLOAT
    },
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    }
    // dueDate: {
    //   type: DataTypes.DATE
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
