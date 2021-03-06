// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
// const {personalCategories} = require("../utils/categories.js");
const { makeEstimate } = require("../config/utils/estimates.js");
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
    console.log("req.user: ", req.user);
    if (req.user) {
      db.Budgets.findOne({
        where: {
          UserId: userId
        }.then(budget => {
          if (budget) {
            res.redirect("/budgets");
          } else {
            res.redirect("/create-budget");
          }
        })
      });
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/budgets", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../public/create-budget.html"));
    // console.log('req.user: ', req.user);
    // console.log('categories: ', categories);
    makeEstimate(req.user.id, est => {
      console.log("est: ", est);

      if (!est) {
        res.sendFile(path.join(__dirname, "../public/create-budget.html"));
      } else {
        res.render("index", {
          category: est,
          income: est.income
        });
      }
    });
  });
  // res.sendFile(path.join(__dirname, "../public/budgets.html"));

  app.get("/create-budget", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/create-budget.html"));
  });
};
