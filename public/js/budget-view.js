$(document).ready(() => {
  $("#accordion").accordion();

  $(".delete-element").on("click", function(e) {
    e.preventDefault();
    const $parent = $(this).parent();
    const id = $parent.index();
    console.log('id: ', id);
    
    $.ajax({
      method: "DELETE",
      url: "/api/budget-entries/" + id
    }).then(res => {
      console.log("deleted" + id);
      $parent.empty();
    });
  });

  $(".save").on("click", function(e) {
    e.preventDefault();
    const elType = $(this).prev();
    // console.log('elType: ', elType);
    const amt = $(elType).prev().prev();
    // console.log('amt: ', amt);
    const name = $(amt).prev().prev().prev()
    let catgry = $(name).parent().parent().prev().text();
    // console.log('catgry: ', catgry);

    catgry = catgry.match(/[\S]+/)[0];
    console.log("elType: ", elType.val());
    console.log("name: ", name.val());
    console.log("amt: ", amt.val());
    console.log("catgry: ", catgry);

    console.log("running save");
    // Wont submit the budget if we are missing an entry field
    if (!name.val().trim() || !amt.val().trim() || !elType.val().trim()) {
      return;
    }

    const bType = elType.val().trim() === "Expense";

    console.log("bType: ", bType);

    // Constructing a budget object to hand to the database
    const budget = {
      business: false,
      budgetExpense: bType,
      name: name.val().trim(),
      amount: parseFloat(amt.val().trim()),
      category: catgry,
      BudgetId: 1
    };

    console.log(budget);

    //clear out the values for the next input
    amt.val("");
    name.val("");

    // If we're updating a budget run updateBudget to update a budget
    // Otherwise run submitBudget to create a whole new budget
    addEntry2HTML(budget);
    submitBudget(budget);
  });

  function addEntry2HTML(budget) {
    const bClass = category2Class(budget.category);
    if (budget.budgetExpense) {
      type = "expense";
      $use = $(`.expenses-container.${bClass}`);
    } else {
      type = "budget";
      $use = $(`.budgets-container.${bClass}`);
    }
    $.post("/api/post/budget-entries", budget, res => {
      const $html = $(`<div id=${res.id} class="${type}-entry entry">
        <label class="${type}-entry">${budget.name}:  $</label>
        <input type="text" class="entry-amount ${type}-entry noboarder" value="${budget.amount}"></input>
        <button class="delete-element">X</button>
      </div>`);

      updateTotals(budget, () => {
        $use.prepend($html);
      });
    });

    // window.location.href = "/budgets";
  }

  function category2Class(category) {
    return category.match(/\w+/)[0];
  }

  function updateTotals(budget, cb) {
    const bClass = category2Class(budget.category);
    $.get("/api/budget/estimate", est => {
      console.log('the est: ', est);

      $("#total-income").text("$" + est[0].totalIncome);
      $("#total-expenses").text("$" + est[0].totalExpenses);
      $("#total-budget").text("$" + est[0].totalBudgets);
      est.forEach(e => {
        console.log('e.name: ', e.name);
        console.log('budget.category: ', budget.category);
        if (e.name === budget.category) {
          console.log('e.budgetTotal: ', e.budgetTotal);
          console.log('e.expensesTotal: ', e.expensesTotal);
          $(`.budget.${bClass}`).text("$" + e.budgetTotal);
          $(`.expense.${bClass}`).text("$" + e.expensesTotal);
        }
      });
      cb();
    });
  }



  //     $(document).on("click", ".amount", editTodo); //waits for click on item
  //     $(document).on("keyup", ".amount", finishEdit); //waits for enter to be pressed
  //     $(document).on("blur", ".amount", cancelEdit); //waits for focus to change then moves

  //   // This function grabs todos from the database and updates the view
  //   function getTodos() {
  //     $.get("/api/todos", function(data) {
  //       todos = data;
  //       initializeRows();
  //     });
  //   }
  //   // This function handles showing the input box for a user to edit a todo
  //   function editTodo() {
  //     var currentTodo = $(this).data("todo");
  //     $(this).children().hide();
  //     $(this).children("input.edit").val(currentTodo.text);
  //     $(this).children("input.edit").show();
  //     $(this).children("input.edit").focus();
  //   }

  //   // This function starts updating a todo in the database if a user hits the "Enter Key"
  //   // While in edit mode
  //   function finishEdit(event) {
  //     var updatedTodo = $(this).data("todo");
  //     if (event.which === 13) {
  //       updatedTodo.text = $(this).children("input").val().trim();
  //       $(this).blur();
  //       updateTodo(updatedTodo);
  //     }
  //   }

  //   // This function is called whenever a todo item is in edit mode and loses focus
  //   // This cancels any edits being made
  //   function cancelEdit() {
  //     var currentTodo = $(this).data("todo");
  //     if (currentTodo) {
  //       $(this).children().hide();
  //       $(this).children("input.edit").val(currentTodo.text);
  //       $(this).children("span").show();
  //       $(this).children("button").show();
  //     }
  //   }

  //   // This function updates a todo in our database
  //   function updateTodo(todo) {
  //     $.ajax({
  //       method: "PUT",
  //       url: "/api/todos",
  //       data: todo
  //     }).then(getTodos);
  //   }

  // function updateList(listElement)

  // });

  // function createNewRow(todo) {
  //     var $newInputRow = $(
  //       [
  //         "<li class='list-group-item todo-item'>",
  //         "<span>",
  //         todo.text,
  //         "</span>",
  //         "<input type='text' class='edit' style='display: none;'>",
  //         "<button class='delete btn btn-danger'>x</button>",
  //         "<button class='complete btn btn-primary'>✓</button>",
  //         "</li>"
  //       ].join("")
  //     );

  //     $newInputRow.find("button.delete").data("id", todo.id);
  //     $newInputRow.find("input.edit").css("display", "none");
  //     $newInputRow.data("todo", todo);
  //     if (todo.complete) {
  //       $newInputRow.find("span").css("text-decoration", "line-through");
  //     }
  //     return $newInputRow;
});
