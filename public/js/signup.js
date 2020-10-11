// const categories = require("categories");

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(() => {
        // window.location.render("/budget");
        window.location.replace("/create-budget");
      })
      // If there's an error, handle it by throwing up a bootstrap alert
      .catch(err => {
        handleLoginErr(err, email, password);
      });
  }

  function handleLoginErr(err, email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(res => {
        console.log("res: ", res);

        $.get("/api/budgets/" + res.id).then(budgets => {
          console.log("budgets: ", budgets);
          if (budgets !== null) {
            window.location.replace("/budgets");
          } else {
            window.location.replace("/create-budget");
          }
        });
      })
      .catch(() => {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      });
  }
});
