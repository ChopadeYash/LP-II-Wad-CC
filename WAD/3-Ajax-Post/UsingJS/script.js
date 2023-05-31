// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get the form input values
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;

  // Create an object with the user data
  var userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  // Push the user data to local storage
  var userList = JSON.parse(localStorage.getItem("userList"));
  if (!userList) {
    userList = []; // If no data found, initialize an empty array
  }
  userList.push(userData);
  localStorage.setItem("userList", JSON.stringify(userList));

  // Redirect to the data list page
  window.location.href = "data-list.html";
}

// Attach event listener to the form submission
var form = document.getElementById("registrationForm");
form.addEventListener("submit", handleSubmit);
