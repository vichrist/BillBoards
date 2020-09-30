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
      
    // get catagories to add sub categories
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
            catagoryId: c.id,
            name: "Weekly"
          },{
            catagoryId: c.id,
            name: "Bi-Weekly"
          },{
            catagoryId: c.id,
            name: "Monthly"
          },{
            catagoryId: c.id,
            name: "One Time"
          });
          break;
        case "Mortgage/Rent":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "1st Mortgage"
          },{
            catagoryId: c.id,
            name: "2nd Mortgage"
          },{
            catagoryId: c.id,
            name: "Rent"
          },{
            catagoryId: c.id,
            name: "Repairs/Maint."
          },{
            catagoryId: c.id,
            name: "Real Estate Taxes"
          },{
            catagoryId: c.id,
            name: "Association Dues"
          });          
          break;
        case "Utilities":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Electricity"
          },{
            catagoryId: c.id,
            name: "Gas"
          },{
            catagoryId: c.id,
            name: "Water"
          },{
            catagoryId: c.id,
            name: "Trash"
          },{
            catagoryId: c.id,
            name: "Phone(s)"
          },{
            catagoryId: c.id,
            name: "Internet"
          },{
            catagoryId: c.id,
            name: "TV Package"
          },{
            catagoryId: c.id,
            name: "Sling"
          },{
            catagoryId: c.id,
            name: "Netflix"
          },{
            catagoryId: c.id,
            name: "Amazon Prime"
          },{
            catagoryId: c.id,
            name: "Hulu"
          },{
            catagoryId: c.id,
            name: "Disney"
          });          
          break;
        case "Insurance":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Life"
          },{
            catagoryId: c.id,
            name: "Health"
          },{
            catagoryId: c.id,
            name: "Car"
          },{
            catagoryId: c.id,
            name: "Home Owners/Renters"
          },{
            catagoryId: c.id,
            name: "Disability"
          },{
            catagoryId: c.id,
            name: "Long-Term Care"
          });          
          break;
        case "Giving":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Charity"
          },{
            catagoryId: c.id,
            name: "Tithes"
          });          
          break;
        case "Transportation":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Gas & Oil"
          },{
            catagoryId: c.id,
            name: "Repairs & Tires"
          },{
            catagoryId: c.id,
            name: "License & Taxes"
          },{
            catagoryId: c.id,
            name: "Bus/Train Pass"
          });          
          break;
        case "Clothing":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Adults"
          },{
            catagoryId: c.id,
            name: "Children"
          },{
            catagoryId: c.id,
            name: "Cleaning/Laundry"
          });          
          break;
        case "Debt":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Credit Card"
          },{
            catagoryId: c.id,
            name: "Car Payment"
          },{
            catagoryId: c.id,
            name: "Student Loan"
          });          
          break;
        case "Food":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Groceries"
          },{
            catagoryId: c.id,
            name: "Resturants/Takeout"
          });         
          break;
        case "Savings":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Vacation"
          },{
            catagoryId: c.id,
            name: "Christmas"
          },{
            catagoryId: c.id,
            name: "Birthdays"
          },{
            catagoryId: c.id,
            name: "Retirement"
          },{
            catagoryId: c.id,
            name: "Emergencies"
          });          
          break;
        case "Medical/Health":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Medications"
          },{
            catagoryId: c.id,
            name: "Doctors Bills"
          },{
            catagoryId: c.id,
            name: "Dentist"
          },{
            catagoryId: c.id,
            name: "Optometrist"
          },{
            catagoryId: c.id,
            name: "Vitamins"
          });         
          break;
        case "Personal":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Child Care/Sitter"
          },{
            catagoryId: c.id,
            name: "Toiletries"
          },{
            catagoryId: c.id,
            name: "Cosmetics/Hair Care"
          },{
            catagoryId: c.id,
            name: "Education/Tuition"
          },{
            catagoryId: c.id,
            name: "Books/Supplies"
          },{
            catagoryId: c.id,
            name: "Child Support"
          },{
            catagoryId: c.id,
            name: "Alimony"
          },{
            catagoryId: c.id,
            name: "Subscriptions"
          },{
            catagoryId: c.id,
            name: "Organization Dues"
          },{
            catagoryId: c.id,
            name: "Pocket Money"
          },{
            catagoryId: c.id,
            name: "Baby Supplies"
          },{
            catagoryId: c.id,
            name: "Pet Supplies"
          },{
            catagoryId: c.id,
            name: "Music/Technology"
          },{
            catagoryId: c.id,
            name: "Misculaneous"
          });          
          break;
        case "Recreation":
          await db.subCategories.bulkCreate({
            catagoryId: c.id,
            name: "Gym Membership"
          },{
            catagoryId: c.id,
            name: "Entertainment"
          },{
            catagoryId: c.id,
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