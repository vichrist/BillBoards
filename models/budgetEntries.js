module.exports = function(sequelize, DataTypes) {
    const BudgetEntries = sequelize.define("BudgetEntries", {
      business: {
        type: DataTypes.BOOLEAN
      },
      budgetExpences: {
        type: DataTypes.BOOLEAN
      },
      amount: {
          type: DataTypes.DECIMAL
      },
      name: {
          type: DataTypes.STRING
      },
      budgetEntriescol: {
          type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      }
    
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