// module.exports = function(sequelize, DataTypes) {
//   const Milage = sequelize.define("Milage", {
//     business: {
//       type: DataTypes.BOOLEAN
//     },
//     startingMilage: {
//       type: DataTypes.STRING
//     },
//     endingMilage: {
//         type: DataTypes.STRING
//     },
//     totalMilage: {
//         type: DataTypes.STRING
//     },
//     //need to add budgetID and timer ID
//   });
  
//   Milage.associate = function(models) {
//     Milage.belongsTo(models.User, {
//       foreignKey: {
//         allowNull: false
//       }
//     });
//   };
//   return Milage;
// };
   