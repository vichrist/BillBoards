// const { doc } = require("prettier");


$(document).ready(() => {
  const setupForm = $(".setup");

  // listen for submit on create budget form
  setupForm.on("submit", e => {
    e.preventDefault();
    const type = $("budget-category2"); //check business radio button
    const name = $("budget-name");

    $.get("/api/user_data").then(data => {
      // post a budget (personal or business as selected)
      $.post("/api/post/budget", {
        business: type.checked,
        budgetName: name,
        userId: data.id
      }).then(budget => {
        // post initial income to that budget
        $.post("/api/post/budget-entries", {
          
        }).then()
        // route to budgets page
      });

    });


  });
});
