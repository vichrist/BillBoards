const db = require("../models");

module.exports = function(app) {
  // post initial categories and sub categories
  app.post("api/init-budget", (req, res) => {
    // add the rest of the categories
    await db.categories.bulkCreate([{
      title: "Income",
      budgetId: req.body.budgetId
    },{
      title: "Mortgage/Rent",
      percentage: 25,
      budgetId: req.body.budgetId
    },{
      title: "Utilities",
      percentage: 5,
      budgetId: req.body.budgetId
    },{
      title: "Insurance",
      percentage: 10,
      budgetId: req.body.budgetId
    },{
      title: "Giving",
      percentage: 10,
      budgetId: req.body.budgetId
    },{
      title: "Transportation",
      percentage: 10,
      budgetId: req.body.budgetId
    },{
      title: "Clothing",
      percentage: 5,
      budgetId: req.body.budgetId
    },{
      title: "Debt",
      percentage: 5,
      budgetId: req.body.budgetId
    },{
      title: "Food",
      percentage: 5,
      budgetId: req.body.budgetId
    },{
      title: "Savings",
      percentage: 5,
      budgetId: req.body.budgetId
    },{
      title: "Medical/Health",
      percentage: 5,
      budgetId: req.body.budgetId
    },{
      title: "Personal",
      percentage: 5,
      budgetId: req.body.budgetId
    },{
      title: "Recreation",
      percentage: 5,
      budgetId: req.body.budgetId
    }])
      
    // get categories to add sub categories
    const categories = await db.categories.findAll({
      where: {
        budgetId: req.body.budgetId
      }
    });

    // add the sub categories
    categories.forEach(c => {
      switch(c.title) {
        case "Income":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Weekly"
          },{
            categoryId: c.id,
            name: "Bi-Weekly"
          },{
            categoryId: c.id,
            name: "Monthly"
          },{
            categoryId: c.id,
            name: "One Time"
          });
          break;
        case "Mortgage/Rent":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "1st Mortgage"
          },{
            categoryId: c.id,
            name: "2nd Mortgage"
          },{
            categoryId: c.id,
            name: "Rent"
          },{
            categoryId: c.id,
            name: "Repairs/Maint."
          },{
            categoryId: c.id,
            name: "Real Estate Taxes"
          },{
            categoryId: c.id,
            name: "Association Dues"
          });          
          break;
        case "Utilities":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Electricity"
          },{
            categoryId: c.id,
            name: "Gas"
          },{
            categoryId: c.id,
            name: "Water"
          },{
            categoryId: c.id,
            name: "Trash"
          },{
            categoryId: c.id,
            name: "Phone(s)"
          },{
            categoryId: c.id,
            name: "Internet"
          },{
            categoryId: c.id,
            name: "TV Package"
          },{
            categoryId: c.id,
            name: "Sling"
          },{
            categoryId: c.id,
            name: "Netflix"
          },{
            categoryId: c.id,
            name: "Amazon Prime"
          },{
            categoryId: c.id,
            name: "Hulu"
          },{
            categoryId: c.id,
            name: "Disney"
          });          
          break;
        case "Insurance":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Life"
          },{
            categoryId: c.id,
            name: "Health"
          },{
            categoryId: c.id,
            name: "Car"
          },{
            categoryId: c.id,
            name: "Home Owners/Renters"
          },{
            categoryId: c.id,
            name: "Disability"
          },{
            categoryId: c.id,
            name: "Long-Term Care"
          });          
          break;
        case "Giving":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Charity"
          },{
            categoryId: c.id,
            name: "Tithes"
          });          
          break;
        case "Transportation":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Gas & Oil"
          },{
            categoryId: c.id,
            name: "Repairs & Tires"
          },{
            categoryId: c.id,
            name: "License & Taxes"
          },{
            categoryId: c.id,
            name: "Bus/Train Pass"
          });          
          break;
        case "Clothing":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Adults"
          },{
            categoryId: c.id,
            name: "Children"
          },{
            categoryId: c.id,
            name: "Cleaning/Laundry"
          });          
          break;
        case "Debt":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Credit Card"
          },{
            categoryId: c.id,
            name: "Car Payment"
          },{
            categoryId: c.id,
            name: "Student Loan"
          });          
          break;
        case "Food":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Groceries"
          },{
            categoryId: c.id,
            name: "Resturants/Takeout"
          });         
          break;
        case "Savings":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Vacation"
          },{
            categoryId: c.id,
            name: "Christmas"
          },{
            categoryId: c.id,
            name: "Birthdays"
          },{
            categoryId: c.id,
            name: "Retirement"
          },{
            categoryId: c.id,
            name: "Emergencies"
          });          
          break;
        case "Medical/Health":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Medications"
          },{
            categoryId: c.id,
            name: "Doctors Bills"
          },{
            categoryId: c.id,
            name: "Dentist"
          },{
            categoryId: c.id,
            name: "Optometrist"
          },{
            categoryId: c.id,
            name: "Vitamins"
          });         
          break;
        case "Personal":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Child Care/Sitter"
          },{
            categoryId: c.id,
            name: "Toiletries"
          },{
            categoryId: c.id,
            name: "Cosmetics/Hair Care"
          },{
            categoryId: c.id,
            name: "Education/Tuition"
          },{
            categoryId: c.id,
            name: "Books/Supplies"
          },{
            categoryId: c.id,
            name: "Child Support"
          },{
            categoryId: c.id,
            name: "Alimony"
          },{
            categoryId: c.id,
            name: "Subscriptions"
          },{
            categoryId: c.id,
            name: "Organization Dues"
          },{
            categoryId: c.id,
            name: "Pocket Money"
          },{
            categoryId: c.id,
            name: "Baby Supplies"
          },{
            categoryId: c.id,
            name: "Pet Supplies"
          },{
            categoryId: c.id,
            name: "Music/Technology"
          },{
            categoryId: c.id,
            name: "Misculaneous"
          });          
          break;
        case "Recreation":
          await db.subCategories.bulkCreate({
            categoryId: c.id,
            name: "Gym Membership"
          },{
            categoryId: c.id,
            name: "Entertainment"
          },{
            categoryId: c.id,
            name: "Trainer"
          });          
          break;
      };
    });
  });

  // update categories with values based on income
  app.put("api/estimate-budget", (req, res) => {

  });

  // update categories based on budget items
  app.put("api/update-budget", (req, res) => {

  });

};