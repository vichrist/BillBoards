const db = require("../models");
const categories = require("../public/js/categories.js");

module.exports = function(app) {
  // Get budget estimate for categories
  app.get("/api/budget/estimate", (req, res) => {
    // get all incomes to find total income
    makeEstimate((estimate) => {
      console.log('estimate: ', estimate);
      res.json(estimate);
    });
  });

  function makeEstimate(cb) {
    db.BudgetEntries.findAll({
      where: {
        category: "Income"
      }
    }).then(incomes => {
      console.log('incomes: ', incomes);
      if (!incomes) {
        res.json(null);
      }

      // add up incomes except One Time incomes
      let totalIncome = 0;
      incomes.forEach(inc => {
        console.log('inc.name: ', inc.name);
        // let inc = incObj.BudgetEntries;
        // console.log('inc: ', inc);

        if (inc.name !== "One Time") {
          switch (inc.name) {
            case "Daily":
              inc.amount *= 30;
              break;
            case "Weekly":
              inc.amount *= 4;
              break;
            case "Bi-weekly":
              inc.amount *= 2;
              break;
          }
          totalIncome += inc.amount;
        }
      });

      console.log('totalIncome: ', totalIncome);

      // create estimate objects for each category
      const estimate = categories.personalCategories;
      // let curTotal = 0;
      for (i = 0; i < estimate.length; i++) {
        let c = estimate[i];
        console.log('c: ', c);
        if (i === 0) {
          c.suggested = totalIncome;
        } else {
          c.suggested = ((c.startPercent / 100) * totalIncome).toFixed(2);
          console.log('c.suggested: ', c.suggested);
        }
      }
      
      // console.log('curTotal: ', curTotal);
      console.log('totalIncome: ', totalIncome);
      
      
      // return estimate
      cb(estimate);
    });
  };
};
