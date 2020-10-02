// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

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
    db.User.create({
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
  app.get("api/budgets/:userId", (req, res) => {
    db.Budgets.findAll({
      where: {
        userId: req.param.userId
      }
    }).then(all => {
      res.json(all);
    });
  });

  // get all categories
  app.get("api/categories/:budgetId", (req, res) => {
    db.Categories.findAll({
      where: {
        budgetId: req.param.budgetId
      }
    }).then(all => {
      res.json(all);
    });
  });
  // post new category

  app.post("/api/post/categories", (req, res) => {
    db.Categories.create({
      name: req.body.name, 
      total: req.body.total, 
      percentage: req.body.percentage
    }) 
    .then((postCategories) =>{
      res.json(postCategories); 
    });
  });
  

// get all sub categories for category_id
  app.get("api/subcategories/:categoryId", (req, res) => {
    db.Sub_Categories.findAll({
      where: {
        categoryId: req.param.categoryId
      }
    }).then(all => {
      res.json(all);
    });
  });


// post new sub category to category_id --- NOT SURE IF THIS IS CORRECT

// app.post("/api/post/subcategories", (req, res) => {
//   db.Sub_Categories.create({
//     name: req.body.name, 
//     total: req.body.total, 
//     percentage: req.body.percentage
//   }) 
//   .then((postSubCategories) =>{
//     res.json(postSubCategories); 
//   });
// });


// post budget entry to budgetId

// get all budget entries for budgetId

app.get("api/budget-entries/:budgetId", (req, res) => {
  db.Budget-Entries.findAll({
    where: {
      budgetId: req.param.budgetId
    }
  }).then(all => {
    res.json(all);
  });
});

// get all budget entries for budgetId and category
app.get("api/budget-entries/:budgetId/categoryId", (req, res) => {
  db.Budget-Entries.findAll({
    where: {
      budgetId: req.param.budgetId, 
      categoriesId: req.param.categoriesId
    }
  }).then(all => {
    res.json(all);
  });
});

// get all budget entries for budgetId and category and subcategory

app.get("api/budget-entries/:budgetId/categoryId/subcategoryId", (req, res) => {
  db.Budget-Entries.findAll({
    where: {
      budgetId: req.param.budgetId, 
      categoriesId: req.param.categoriesId, 
      sub_categoriesId: req.param.sub_categoriesId
    }
  }).then(all => {
    res.json(all);
  });
});

// post milage start time 
// return timeid

// post milage end time for timeId

// get all milage for userId

// get milage for a description

// post start time
// return timeId

// post end time for timeid

// get all times for userId

// get all times for a description
};
