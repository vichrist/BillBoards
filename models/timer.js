module.exports = function(sequelize, DataTypes) {
    const Timer = sequelize.define("Timer", {
      business: {
        type: DataTypes.BOOLEAN
      },
      startTime: {
        type: DataTypes.STRING
      },
      endTime: {
          type: DataTypes.STRING
      },
      totalTime: {
          type: DataTypes.STRING
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
  