const { makeEstimate } = require("../config/utils/estimates.js");
const { updateTotals } = require("../config/utils/updateCounts");

module.exports = function(app) {
  // Get budget estimate for categories
  app.get("/api/budget/estimate", (req, res) => {
    // get all incomes to find total income
    makeEstimate(req.user.id, (estimate) => {
      console.log('estimate: ', estimate);
      res.json(estimate);
    });
  });

  // app.get("/api/budget/totals", (req, res) => {
  //   updateTotals(req.user.id, () => {
  //     console.log("Updated Totals!")
  //   });
  // });
};
