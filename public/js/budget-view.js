let oldName = ""
let oldAmount = ""

$(document).ready(() => {
  // add the accordion affect to the budget table
  $("#accordion").accordion();

  //delete a budget or expense item
  $(".entries").on("click", ".delete-element", function(e) {
    e.preventDefault();
    console.log("deleting was clicked");
    const $parent = $(this).parent();
    console.log("$parent: ", $parent);
    const id = $parent.data("id");
    console.log("id: ", id);

    $.ajax({
      method: "DELETE",
      url: "/api/budget-entries/" + id
    }).then(res => {
      console.log("deleted" + id);
      $parent.empty();
      updateTotals();
    });
  });

  //add a budget or expense item
  $(".save").on("click", function(e) {
    e.preventDefault();
    console.log("running save");

    const $parent = $(this).parent();
    const $name = $parent.find(".entry-title");
    const name = $name.val().trim();
    const $amt = $parent.find(".entry-amount");
    let amt = $amt.val().trim();
    let elType = $parent.find(".entry-type").val();
    if (elType === undefined) {
      elType = "Budgeting";
    }
    
    const catgry = $parent.find("datalist").attr("id");
    console.log('name: ', name);
    console.log('amt: ', amt);
    console.log('elType: ', elType);
    
    // Wont submit the budget if we are missing an entry field
    if (!name || !amt || !elType) {
      return;
    }

    if (amt.match(/[+-/*]/)) {
      amt = eval(amt);
    }

    // Constructing a budget object to hand to the database
    const budget = {
      business: false,
      isExpense: elType === "Expense",
      name: name,
      amount: parseFloat(amt),
      category: catgry,
      BudgetId: 1
    };

    console.log(budget);

    //clear out the values for the next input
    $amt.val("");
    $name.val("");

    // If we're updating a budget run updateBudget to update a budget
    // Otherwise run submitBudget to create a whole new budget
    addEntry2HTML(budget);
  });

  function addEntry2HTML(budget) {
    const bClass = budget.category.match(/\w+/)[0]; //just use first word for a class name
    if (budget.isExpense) {
      type = "expense";
      $use = $(`.expenses-container.${bClass}`);
    } else {
      type = "budget";
      $use = $(`.budgets-container.${bClass}`);
    }
    $.post("/api/post/budget-entries", budget, res => {
      console.log("res: ", res);

      const $html = $(`<div data-id=${res.id} class="${type}-entry entry">
        <input type="text" class="${type} entry-name noboarder" value="${budget.name}">: $</input>
        <input type="text" class="${type} entry-amount ${type}-entry noboarder" value="${budget.amount.toFixed(2)}"></input>
        <button class="delete-element">x</button>
      </div>`);

      $use.prepend($html);
      updateTotals();
    });
  }

  function updateTotals() {
    $.get("/api/budget/estimate", est => {
      console.log("the est: ", est);
      
      console.log("est[0].totalIncome: ", parseFloat(est[0].totalIncome).toFixed(2));
      console.log("est[0].totalBudgets: ", parseFloat(est[0].totalBudgets).toFixed(2));
      console.log("est[0].totalExpenses: ", parseFloat(est[0].totalExpenses).toFixed(2));

      // update the grand totals on the income
      $("#total-income").text("$" + parseFloat(est[0].totalIncome).toFixed(2));
      $("#total-expenses").text("$" + parseFloat(est[0].totalExpenses).toFixed(2));
      $("#total-budget").text("$" + parseFloat(est[0].totalBudgets).toFixed(2));
      if (est[0].totalExpenses > est[0].totalBudgets) {
        $("#total-expenses").attr("class", "col-sm-4 over-expense");
      } else {
        $("#total-expenses").attr("class", "col-sm-4 under-expense");
      }
  
      // loop through each category in estimate and update the elements on the HTML
      est.forEach(e => {
        // console.log("e.name: ", e.name);
  
        //get the class name for finding the budget list and expense list
        const bClass = e.class;
  
        // update the budget and expense totals for the category
        // console.log("e.budgetTotal: ", e.budgetTotal);
        // console.log("e.expensesTotal: ", e.expensesTotal);
        $(`.budget.${bClass}`).text("$" + e.budgetTotal.toFixed(2));
        $(`.expense.${bClass}`).text("$" + e.expensesTotal.toFixed(2));
        if (e.isOverBudget) {
          $(`.expense-total.${bClass}`).attr(`class`, `expense-total ${bClass} over-expense`);
        } else {
          $(`.expense-total.${bClass}`).attr("class", `expense-total ${bClass} under-expense`);
        }

      });
    });
  }

  // listeners for updating an entry amount
  $(document).on("click", ".entry", startEdit); //waits for enter to be pressed
  $(document).on("keyup", ".entry", finishEdit); //waits for enter to be pressed
  $(document).on("blur", ".entry", cancelEdit); //waits for enter to be pressed

  //   // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    if (event.which === 13) {
      const name = $(this).find(".entry-name").val().trim();
      let amt = $(this).find(".entry-amount").val().trim();
      const id = $(this).data("id")

      amt = eval(amt).toFixed(2);
      $(this).find(".entry-amount").val(amt); // store evaluated code
      $(this).find(".entry-name").val(name);

      const entry = {
        name: name,
        amount: amt,
        id: id
      }
    
      // console.log('id: ', id);
      // console.log('name: ', name);
      // console.log('amt: ', amt);
      $(this).find(".entry-name").blur();
      $(this).find(".entry-amount").blur();
      

      $.ajax({
        method: "PUT",
        url: "/api/entry/update",
        data: entry
      }).then(()=> {
        updateTotals();
      });
    }
  };

  function startEdit(event) {
    // save original values 
    if (oldAmount === "" && oldName === "") {
      oldAmount = $(this).find(".entry-amount").val().trim();
      oldName = $(this).find(".entry-name").val().trim();
    }
  }

  function cancelEdit(event) {
    //restore original values
    $(this).find(".entry-amount").val(oldAmount);
    $(this).find(".entry-name").val(oldName);
    oldName = "";
    oldAmount = "";
  }

});
