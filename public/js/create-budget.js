$(document).ready(() => {
  // listen for submit on create budget form
  $("#createButton").on("click", e => {
    e.preventDefault();
    const budgetType = $("#business")[0].checked; //check business radio button
    console.log('budgetType: ', budgetType);
    const name = $("#budgetName").val().trim();
    console.log('name: ', name);
    const incomeAmt = $("#income").val().trim();
    console.log('incomeAmt: ', incomeAmt);
    const incType = $("#incomeType").val().trim();
    console.log('incType: ', incType);

    if (name ===  "" || incomeAmt === "" || incType === "") {
      return;
    }

    //get user id for Budgets table
    $.get("/api/user_data").then(data => {
      // post a budget (personal or business as selected)
      $.get("/api/budgets/" + data.id).then(allRes => {
        // console.log('allRes: ', allRes);

        $.post("/api/post/budget", {
          business: budgetType,
          budgetName: name,
          UserId: data.id
        }).then(ans => {
          // console.log('ans: ', ans);

          // post initial income to that budget
          $.post("/api/post/budget-entries", {
            business: budgetType,
            isExpense: false,
            amount: parseFloat(incomeAmt),
            name: incType,
            category: "Income",
            BudgetId: ans.id
          }).then(res => {
            console.log('res: ', res);
            // route to budgets view page
            window.location.replace("/budgets");
          });
        });
      });
    });
  });

  // listen for view button click and send to viewbudgets page
  $("#viewButton").on("click", e => {
    // route to budgets view page
    window.location.replace("/budgets");
  });
});
