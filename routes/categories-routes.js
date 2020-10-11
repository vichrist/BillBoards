const { makeEstimate } = require("../config/utils/estimates.js");

module.exports = function(app) {
  // Get budget estimate for categories
  app.get("/api/budget/estimate", (req, res) => {
    console.log('req.user: ', req.user);

    // get all incomes to find total income
    makeEstimate(req.user.id, (estimate) => {
      console.log('estimate: ', estimate);
      res.json(estimate);
    });
  });
};
