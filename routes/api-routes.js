// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const budgetEntries = require("../models/budgetEntries");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log("signing up");
    db.Users.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // get all budgets for userId
  app.get("/api/budgets/:userId", (req, res) => {
    console.log(`Getting all budgets for user #${req.params.userId}`)
    db.Budgets.findAll({
      where: {
        UserId: req.params.userId
      },
      include: [db.BudgetEntries]
    }).then(all => {
      res.json(all);
    });
  });

  // get a budget
  app.get("/api/budget/:userId/:budgetName", (req, res) => {
    console.log(`getting the ${req.params.budgetName} budget`);
    db.Budgets.findOne({
      where: {
        UserId: req.params.userId,
        budgetName: req.params.budgetName
      }
    }).then(response => {
      res.json(response);
    })
  });

  // post a budget
  app.post("/api/post/budget", (req, res) => {
    console.log(`Adding new budget for user #${req.body.UserId}`)
    db.Budgets.create({
      business: req.body.business,
      budgetName: req.body.budgetName,
      UserId: req.body.UserId
    }).then(postBudgets => {
      res.json(postBudgets);
    });
  });

  // post new category
  app.post("/api/post/category", (req, res) => {
    console.log(`Adding a category of ${req.body.subcategoryName} to ${req.body.categoryName}`);
    db.Categories.create({
      categoryName: req.body.categoryName,
      subcategoryName: req.body.subcategoryName
    }).then(postCategories => {
      res.json(postCategories);
    });
  });

  // post budget entry to budgetId
  app.post("/api/post/budget-entries", (req, res) => {
    console.log(`Adding a budget entry for ${req.body.name}`);
    db.BudgetEntries.create({
      business: req.body.business,
      budgetExpense: req.body.budgetExpense,
      amount: req.body.amount,
      name: req.body.name, // not so sure we need this line here
      category: req.body.category,
      BudgetId: req.body.budgetId
    }).then(postBudgetEntries => {
      res.json(postBudgetEntries);
    });
  });

  // // get all budget entries for budgetId
  // app.get("api/budget-entries/:budgetId", (req, res) => {
  //   db.BudgetEntries.findAll({
  //     where: {
  //       budgetId: req.param.budgetId
  //     }
  //   }).then(all => {
  //     res.json(all);
  //   });
  // });

  // // get all budget entries for budgetId and category
  // app.get("api/budget-entries/:budgetId/:categoryId", (req, res) => {
  //   db.BudgetEntries.findAll({
  //     where: {
  //       budgetId: req.param.budgetId,
  //       categoriesId: req.param.categoriesId
  //     }
  //   }).then(all => {
  //     res.json(all);
  //   });
  // });

  // post mileage start time

  // return timeid

  // post mileage end time for timeId

  // get all mileage for userId

  // get mileage for a description

  // post start time

  // return timeId

  // post end time for timeid

  // get all times for userId

  // get all times for a description
};
