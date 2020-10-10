// const { makeEstimate } = require("./estimates.js");

// function updateTotals(userId, cb) {
//   makeEstimate(userId, est => {
//     // console.log("update est: ", est);

//     // update the grand totals on the income
//     $("#total-income").text("$" + est[0].totalIncome);
//     $("#total-expenses").text("$" + est[0].totalExpenses);
//     $("#total-budget").text("$" + est[0].totalBudgets);

//     // loop through each category in estimate and update the elements on the HTML
//     est.forEach(e => {
//       console.log("e.name: ", e.name);
//       console.log("budget.category: ", budget.category);

//       //get the class name for finding the budget list and expense list
//       const bClass = e.class;

//       // update the budget and expense totals for the category
//       console.log("e.budgetTotal: ", e.budgetTotal);
//       console.log("e.expensesTotal: ", e.expensesTotal);
//       $(`.budget.${bClass}`).text("$" + e.budgetTotal);
//       $(`.expense.${bClass}`).text("$" + e.expensesTotal);
//     });

//     cb();
//   });
// }

// module.exports = { updateTotals };
