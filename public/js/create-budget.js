// const { doc } = require("prettier");

$(document).ready(() => {
  // listen for submit on create budget form
  $(".form").on("submit", e => {
    e.preventDefault();
    const type = $("#business"); //check business radio button
    const name = $("#budgetName").val().trim();
    const incomeAmt = $("#income").val().trim();
    const incType = $("#incomeType").val().trim();

    //get user id for Budgets table
    $.get("/api/user_data").then(data => {
      // post a budget (personal or business as selected)
      $.post("/api/post/budget", {
        business: type.checked,
        budgetName: name,
        userId: data.id
      }).then(() => {
        // post initial income to that budget
        $.post("/api/post/budget-entries", {
          business: type.checked,
          budgetExpenses: false,
          amount: incomeAmt,
          name: incType,
          category: "Income"
        }).then(() => {
          // route to budgets view page
          app.get("/viewbudgets", isAuthenticated, (req, res) => {
            res.sendFile(path.join(__dirname, "../public/viewbudgets.html"));
          });
        });
      });
    });
  });

  // listen for view button click and send to viewbudgets page
  $("#viewButton").on("click", e => {
    // route to budgets view page
    app.get("/viewbudgets", isAuthenticated, (req, res) => {
      res.sendFile(path.join(__dirname, "../public/viewbudgets.html"));
    });
  })
});
