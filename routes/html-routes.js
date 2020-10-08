// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
// const {personalCategories} = require("../utils/categories.js");
const { makeEstimate, getBudgetEntriesCategory } = require("../utils/estimates.js");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the budget page
    if (req.user) {
      res.redirect("/budgets");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the budget page
    console.log('req.user: ', req.user);
    if (req.user) {
      res.redirect("/budgets");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/budgets", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/create-budget.html"));
    // console.log('req.user: ', req.user);
    // console.log('categories: ', categories);
    getBudgetEntriesCategory(req, "Income",income => {
      db.Budgets.findAll({
        where: {
          UserId: req.user.id
        },
        include: [db.BudgetEntries]
      }).then(budgets => {
        // console.log('personalCategories: ', personalCategories);
        // console.log('budgets Name: ', budgets[0].budgetName);
        const entries = budgets[0].BudgetEntries;

        // console.log('budgets entries: ', entries);
        // console.log('budgets entry amount: ', entries[0].amount);

        makeEstimate(req, est => {
          res.render("index", { category: est, budget: entries, income: income });
        });
      });
    })
  });
  // res.sendFile(path.join(__dirname, "../public/budgets.html"));

    app.get("/create-budget", isAuthenticated, (req, res) => {
      res.sendFile(path.join(__dirname, "../public/create-budget.html"));
    });
}
