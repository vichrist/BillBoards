module.exports = function(sequelize, DataTypes) {

    var Budgets = sequelize.define("Budgets", {

        budgetName: {
            type: DataTypes.STRING,
        }, 
        business: {
            type: DataTypes.BOOLEAN, 
        }
    });

    Budgets.associate = function(models) {

    // a budget belongs to a user
    // a budget can't be created without a user due to the foreign key constraint
        Budgets.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return Budgets;
};
    