module.exports = function(sequelize, DataTypes) {
  const Timer = sequelize.define("Timer", {
    business: {
      type: DataTypes.BOOLEAN
    },
    startTime: {
      type: DataTypes.DATETIME
    },
    endTime: {
        type: DataTypes.DATETIME
    },
    totalTime: {
        type: DataTypes.DATETIME
    }
  });
  
  
  Timer.associate = function(models) {
    Timer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Timer;
};
  