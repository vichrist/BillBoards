$(document).ready(() => {
//   $('.subcategory-row').hide();

    $( "#accordion" ).accordion();

//     $(document).on("click", ".todo-item", editTodo);
//     $(document).on("keyup", ".todo-item", finishEdit);
//     $(document).on("blur", ".todo-item", cancelEdit);

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
});
