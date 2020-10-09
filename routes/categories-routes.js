const { makeEstimate } = require("../utils/estimates.js");

module.exports = function(app) {
  // Get budget estimate for categories
  app.get("/api/budget/estimate", (req, res) => {
    // get all incomes to find total income
    makeEstimate(req, (estimate) => {
      console.log('estimate: ', estimate);
      res.json(estimate);
    });
  });
};
