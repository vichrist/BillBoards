const db = require("../../models");
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

function category2Class(category) {
  return category.match(/\w+/)[0];
}

function makeEstimate(userId, cb) {
  // Creating this variable structure
  // estimate[
  //   {
  //     name,
  //     minPercent,
  //     maxPercent,
  //     startPercent,
  //     suggestedAmt,
  //     budgetsTotal,
  //     expensesTotal,
  //     subcategories [],
  //     budgets [],
  //     expenses [],
  //     income {
  //       totalIncome,
  //       allIncome,
  //       totalBudget,
  //       totalExpenses
  //     }
  //   }
  // ]
  // get budget for user
  db.Budgets.findOne({
    where: {
      UserId: userId
    }
  }).then(budget => {
    // console.log("estimate budget: ", budget);
    if (!budget) {
      cb(null);
    }

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

      // loop through each category to update counts
      for (i = 0; i < estimate.length; i++) {
        //stuff for all categories goes here

        //initialize budgets and expenses arrays for entries
        estimate[i].budgets = [];
        estimate[i].expenses = [];

        //make a class variable for handlebars
        estimate[i].class = category2Class(estimate[i].name);
        // console.log("estimate[i].class: ", estimate[i].class);

        //stuff specifically for income goes here
        if (estimate[i].name === "Income") {
          //add income specific values and over all totals
          estimate[inc].budgetName = budget.budgetName;
          estimate[inc].isIncome = true;
          estimate[inc].totalIncome = 0.0; // does not include one time income amounts
          estimate[inc].allIncome = 0.0; // does include one time income amounts
          estimate[inc].totalBudgets = 0.0; //all budget entries total for all categories
          estimate[inc].totalExpenses = 0.0; //all expense entries total for all categories
        } else {
          // make suggested dollar amount based percentage
          estimate[i].suggestedAmt = (
            (estimate[i].startPercent / 100) *
            estimate[inc].totalIncome
          ).toFixed(2);
        }

        estimate[i].budgetTotal = 0;
        estimate[i].expensesTotal = 0;

        // loop through each budget entry
        all.forEach(entry => {
          // console.log("entry.amount: ", entry.amount);
          //save id for use on HTML entry items

          const expenseObj = {};
          const budgetObj = {};

          if (entry.category === estimate[i].name) {
            estimate[i].isIncome = false;
            // console.log("entry.name: ", entry.name);
            // console.log("entry.id: ", entry.id);

            // update totals for Income
            if (estimate[i].name === "Income") {
              estimate[i].isIncome = true;
              // convert other types to monthly amounts
              let amt = 0;
              if (estimate[inc].name !== "One Time") {
                switch (entry.name) {
                  case "Daily":
                  amt = entry.amount * 30;
                    break;
                  case "Weekly":
                    amt = entry.amount * 4;
                    break;
                  case "Bi-weekly":
                    amt = entry.amount * 2;
                    break;
                  default:
                    amt = entry.amount;
                    break;
                }
                estimate[inc].totalIncome += amt;
              } else {
                estimate[inc].allIncome;
              }
              budgetObj.name = entry.name;
              budgetObj.amount = entry.amount;
              budgetObj.id = entry.id;
              estimate[i].budgets.push(budgetObj);
            } else {
              // update totals for all other entries
              if (entry.isExpense) {
                //update expense totals
                estimate[i].expensesTotal += entry.amount; // for category expenses
                estimate[inc].totalExpenses += entry.amount; // for total budget expenses

                //make a expence item
                expenseObj.name = entry.name;
                expenseObj.amount = entry.amount.toFixed(2);
                expenseObj.id = entry.id;
                estimate[i].expenses.push(expenseObj);
              } else {
                //update budget totals
                estimate[i].budgetTotal += entry.amount;
                estimate[inc].totalBudgets += entry.amount;

                //make budget item
                budgetObj.name = entry.name;
                budgetObj.amount = entry.amount.toFixed(2);
                budgetObj.id = entry.id;
                estimate[i].budgets.push(budgetObj);
              }
            }
            // set isOverBudget for expense totals coloring
            if (estimate[i].expensesTotal > 0) {
              if (estimate[i].budgetTotal < estimate[i].expensesTotal) {
                estimate[i].isOverBudget = true;
              } else {
                estimate[i].isOverBudget = false;
              }
            }
          }
        });

        // set isOverBudget for total expenses coloring
        // console.log("estimate[i].expensesTotal: ", estimate[i].expensesTotal);
        // console.log("estimate[i].budgetTotal: ", estimate[i].budgetTotal);
      }

      if (estimate[inc].totalExpenses > 0) {
        if (estimate[inc].totalBudgets < estimate[inc].totalExpenses) {
          estimate[inc].isOverBudget = true;
        } else {
          estimate[inc].isOverBudget = false;
        }
      }
      // console.log("estimate[inc].totalBudgets: ", estimate[inc].totalBudgets);
      // console.log("estimate[inc].totalExpenses: ", estimate[inc].totalExpenses);
      // console.log("estimate[inc].isOverBudget: ", estimate[inc].isOverBudget);
      // console.log("estimate: ", estimate);
      // console.log("estimate[inc].totalIncome: ", estimate[inc].totalIncome);
      // console.log("estimate[inc].totalExpenses: ", estimate[inc].totalExpenses);
      // console.log("estimate[inc].totalBudgets: ", estimate[inc].totalBudgets);

      // get difference between income and total budget
      estimate[inc].income2Budget =
        estimate[inc].totalIncome - estimate[inc].totalBudgets;

      // calc difference between budget and expenses totals
      estimate[inc].budget2Expense =
        estimate[inc].totalBudgets - estimate[inc].totalExpenses;

      // return estimate
      estimate.map(fixed);
      cb(estimate);
    });
  });
}

function fixed(item) {
  for (const key in item) {
    if (typeof item[key] === 'number' && !key.match(/percent/i)) {
      // console.log('key: ', key);
      item[key] = item[key].toFixed(2);
      // console.log('item[key]: ', item[key]);
    }
  }
}

module.exports = {
  makeEstimate,
  getBudgetEntriesCategory
};
