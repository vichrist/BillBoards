const db = require("../models");
const categories = require("../public/js/categories.js")
module.exports = function(app) {
  // update categories based on budget items
  app.get("api/budget/estimate", (req, res) => {
    // get all incomes to find total income
    db.Budget-Entries.findAll({
      where: {
        category: "Income"
      }
    }).then(incomes => {
      console.log(incomes);
      
      // add up incomes except One Time incomes
      let totalIncome = 0;
      incomes.forEach(inc => {
        if (inc.name !== "One Time") {
          totalIncome += inc.amount;
        }
      });

      // create estimate objects for each category
      const estimate = categories;
      estimate.forEach(c => {
        if (c.startPercent !== null) {
          c.suggested = (c.startPercent / 100) * totalIncome;
        }
      });

      // return estimate
      return res.json(estimate);
    });
  });

};