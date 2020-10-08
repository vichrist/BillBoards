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

function makeEstimate(req, cb) {
  // get budget for user
  db.Budgets.findOne({
    where: {
      UserId: req.user.id
    }
  }).then(budget => {
    // get Income budget entries for budget
    db.BudgetEntries.findAll({
      where: {
        BudgetId: budget.id
      }
    }).then(all => {
      // console.log('incomes: ', incomes);
      if (!all) {
        // reroute to create budget

        res.json(null);
      }

      // create estimate objects for each category
      const estimate = categories.personalCategories;
      const inc = 0; //income index

      // loop through each category to campare with
      for (i = 0; i < estimate.length; i++) {
        //stuff for all categories goes here

        //initialize budgets and expenses arrays for entries
        estimate[i].budgets = [];
        estimate[i].expenses = [];
        estimate[i].class = estimate[i].name.split("").join("");
        console.log('estimate[i].class: ', estimate[i].class);

        //stuff specifically for income goes here
        if (estimate[i].name === "Income") {
          //add income specific values
          estimate[inc].isIncome = true;
          estimate[inc].totalIncome = 0.0;
          console.log("estimate[inc].totalIncome: ", estimate[inc].totalIncome);
          estimate[inc].allIncome = 0.0;
          estimate[inc].totalBudgets = 0.0; //all budget entries total for all categories
          estimate[inc].totalExpenses = 0.0; //all expense entries total for all categories
        } else {
          estimate[i].suggestedAmt = (
            (estimate[i].startPercent / 100) *
            estimate[inc].totalIncome
          ).toFixed(2);
          console.log("estimate[i].suggestedAmt: ", estimate[i].suggestedAmt);
        }

        // loop through each budget entry
        all.forEach(entry => {
          console.log("entry.name: ", entry.name);
          console.log("entry.amount: ", entry.amount);
          const expenseObj = {};
          const budgetObj = {};

          if (entry.category === estimate[i].name) {
            estimate[i].budgetTotal = 0;
            estimate[i].expensesTotal = 0;
            estimate[i].isIncome = false;

            // convert other types to monthly amounts
            if (estimate[i].name === "Income") {
              estimate[i].isIncome = true;
              if (estimate[inc].name !== "One Time") {
                switch (entry.name) {
                  case "Daily":
                    entry.amount *= 30;
                    break;
                  case "Weekly":
                    entry.amount *= 4;
                    break;
                  case "Bi-weekly":
                    entry.amount *= 2;
                    break;
                }
                estimate[inc].totalIncome += entry.amount;
              } else {
                estimate[inc].allIncome;
              }
              budgetObj.name = entry.name;
              budgetObj.amount = entry.amount;
              estimate[i].budgets.push(budgetObj);
            } else {
              if (entry.budgetExpense) {
                estimate[i].expensesTotal += entry.amount;
                expenseObj.name = entry.name;
                expenseObj.amount = entry.amount;
                estimate[i].expenses.push(expenseObj);
                estimate[inc].totalIncome += entry.amount;
                estimate[inc].totalExpenses += entry.amount;
              } else {
                estimate[i].budgetTotal += entry.amount;
                budgetObj.name = entry.name;
                budgetObj.amount = entry.amount;
                estimate[i].budgets.push(budgetObj);
                estimate[inc].totalExpenses += entry.amount;
                estimate[inc].totalBudgets += entry.amount;
              }
            }
          }
        });
      }

      console.log("estimate: ", estimate);
      console.log("estimate[inc].totalIncome: ", estimate[inc].totalIncome);
      console.log("estimate[inc].totalExpenses: ", estimate[inc].totalExpenses);
      console.log("estimate[inc].totalBudgets: ", estimate[inc].totalBudgets);

      // return estimate
      cb(estimate);
    });
  });
}

module.exports = {
  makeEstimate,
  getBudgetEntriesCategory
};
