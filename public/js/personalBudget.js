$(document).ready(() => {
  $("#accordion").accordion();

  $(".save").on("click", function(e) {
    e.preventDefault();
    const type = $(this).prev();
    console.log('type: ', type.val());
    const amt = $(type).prev().prev();
    console.log('amt: ', amt.val());
    const name = $(amt).prev().prev().prev();
    console.log('name: ', name.val());
    let catgry = $(name).parent().parent().prev().text();
    console.log('catgry: ', catgry);
    
    catgry = catgry.match(/[\S]+/);
    console.log('catgry: ', catgry[0]);
    
    console.log("running save");
    // Wont submit the budget if we are missing an entry field
    if (
      !name.val().trim() ||
      !amt.val().trim() ||
      !type.val().trim()
    ) {
      return;
    }

    bType = false;
    if (type === "Budgeting") bType=true;

    // Constructing a budget object to hand to the database
    const budget = {
      business: false,
      budgetExpense: bType,
      name: name.val().trim(),
      amount: parseFloat(amt.val().trim()),
      category: catgry[0],
      BudgetId: 1
    };

    console.log(budget);

    // If we're updating a budget run updateBudget to update a budget
    // Otherwise run submitBudget to create a whole new budget

    submitBudget(budget);
  });

  // Submits a new post and brings user to blog page upon completion
  function submitBudget(budget) {
    $.post("/api/post/budget-entries", budget, () => {
    //   window.location.href = "/budgets";
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
