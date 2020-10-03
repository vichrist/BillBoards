module.exports = function(sequelize, DataTypes) {
  const Entries = sequelize.define("Entries", {
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
    category: {
      type: DataTypes.STRING
    },
    budgetEntriescol: {
      type: DataTypes.STRING
    }
  });

  Entries.associate = function(models) {
    Entries.belongsTo(models.Budgets, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Entries;
};