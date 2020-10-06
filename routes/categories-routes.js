const db = require("../models");
const categories = require("../public/js/categories.js");

module.exports = function(app) {
  // Get budget estimate for categories
  app.get("/api/budget/estimate", (req, res) => {
    // get all incomes to find total income
    db.BudgetEntries.findAll({
      where: {
        category: "Income"
      }
    }).then(incomes => {
      console.log('incomes: ', incomes);
      
  
      if (!incomes) {
        return res.json(null);
      }

      // add up incomes except One Time incomes
      let totalIncome = 0;
      incomes.forEach(inc => {
        console.log('inc.name: ', inc.name);
        // let inc = incObj.BudgetEntries;
        // console.log('inc: ', inc);

        if (inc.name !== "One Time") {
          switch (inc.name) {
            case "Weekly":
              inc.amount *= 4;
              break;
            case "Biweekly":
              inc.amount *= 2;
              break;
          }
          totalIncome += inc.amount;
        }
      });

      console.log('totalIncome: ', totalIncome);

      // create estimate objects for each category
      const estimate = categories;
      let curTotal = 0;
      for (i = 1; i < estimate.length; i++) {
        let c = estimate[i];
        if (c.startPercent !== null) {
          if (i < estimate.length - 1) {
            c.suggested = ((c.startPercent / 100) * totalIncome).toFixed(2);
            curTotal += parseFloat(c.suggested);
          } else {
            c.suggested = (totalIncome - curTotal).toFixed(2);
          }
        }
      }
      
      console.log('curTotal: ', curTotal);
      console.log('totalIncome: ', totalIncome);
      console.log('estimate: ', estimate);
      
      // return estimate
      return res.json(estimate);
    });
  });
};
