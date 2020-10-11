$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(res => {
        console.log("res: ", res);

        $.get("/api/budgets/" + res.id).then(budgets => {
          console.log("budgets: ", budgets);
          if (budgets === [] || !budgets) {
            console.log("routing to /create-budget");
            window.location.replace("/create-budget");
          } else {
            console.log("routing to /budgets");
            window.location.replace("/budgets");
          }
        });

        // If there's an error, log the error
      })
      .catch(err => {
        $("#alert .msg").text(`The email or password doesn't match any accounts. If you need to create an account click the link below to go to the sign up page.`);
        $("#alert").fadeIn(500);
      });
  }
});
