// const { doc } = require("prettier");

$(document).ready(() => {
  // listen for submit on create budget form
  $(".form").on("submit", e => {
    e.preventDefault();
    const budgetType = $("#business")[0].checked; //check business radio button
    console.log('budgetType: ', budgetType);
    const name = $("#budgetName").val().trim();
    const incomeAmt = $("#income").val().trim();
    const incType = $("#incomeType").val().trim();

    console.log('budgetType: ', budgetType);

    //get user id for Budgets table
    $.get("/api/user_data").then(data => {
      // post a budget (personal or business as selected)
      $.get("/api/budgets/" + data.id).then(allRes => {
        console.log('allRes: ', allRes);

        $.post("/api/post/budget", {
          business: budgetType,
          budgetName: name,
          UserId: data.id
        }).then(ans => {
          console.log('ans: ', ans);

          // post initial income to that budget
          $.post("/api/post/budget-entries", {
            business: budgetType,
            budgetExpense: false,
            amount: incomeAmt,
            name: incType,
            category: "Income",
            budgetId: ans.id
          }).then(res => {
            // route to budgets view page
            $.get("/api/budget/estimate").then(est => {
              console.log('est: ', est);

              // eslint-disable-next-line no-empty-function
              $.get("/viewbudgets");
            });
          });
        });
      });
    });
  });

  // listen for view button click and send to viewbudgets page
  $("#viewButton").on("click", e => {
    // route to budgets view page
    $.get("/viewbudgets");
  });

});
