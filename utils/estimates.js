const db = require("../models");
const categories = require("./allCategories");

function getBudgetEntriesCategory(req, category, cb) {
  db.Budgets.findOne({
    where: {
      UserId: req.user.id
    }
  }).then(budget => {
    // get Income budget entries for budget
    db.BudgetEntries.findAll({
      where: {
        BudgetId: budget.id,
        category: category
      }
    }).then(data => {
      cb(data);
    });
  });
}

function makeEstimate(req,cb) {
  // get budget for user
  db.Budgets.findOne({
    where: {
      UserId: req.user.id
    }
  }).then(budget => {
    // get Income budget entries for budget
    db.BudgetEntries.findAll({
      where: {
        BudgetId: budget.id,
        category: "Income"
      }
    }).then(incomes => {
      // console.log('incomes: ', incomes);
      if (!incomes) {
        res.json(null);
      }

      // add up incomes except One Time incomes
      let totalIncome = 0;
      incomes.forEach(inc => {
        console.log('inc.name: ', inc.name);
        // let inc = incObj.BudgetEntries;
        // console.log('inc: ', inc);

        // convert other types to monthly amounts
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
  });
}

module.exports = {
  makeEstimate,
  getBudgetEntriesCategory
};
