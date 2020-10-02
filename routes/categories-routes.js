const db = require("../models");
const categories = require("../public/js/categories.js");

module.exports = function(app) {
  // update categories based on budget items
  app.get("api/budget/estimate", (req, res) => {
    // get all incomes to find total income
    db.BudgetEntries.findAll({
      where: {
        category: "Income"
      }
    }).then(incomes => {
      console.log(incomes);
      if (incomes === null) {
        return res.json(null);
      }

      // add up incomes except One Time incomes
      let totalIncome = 0;
      incomes.forEach(inc => {
        if (inc.name !== "One Time") {
          totalIncome += inc.amount;
        }
      });
      if (totalIncome === 0) {
        totalIncome = incomes[0].amount;
      }

      // create estimate objects for each category
      const estimate = categories;
      let curTotal = 0;
      for (i = 1; i < estimate.length; i++) {
        if (c.startPercent !== null) {
          if (i < estimate.length - 1) {
            c.suggested = ((c.startPercent / 100) * totalIncome).toFixed(2);
            curTotal += c.suggested;
          } else {
            c.suggested = totalIncome - curTotal;
          }
        }
      }

      // return estimate
      return res.json(estimate);
    });
  });
};
