"use strict";

import { onEvent, select, sleep, print } from "./utils.js";

const usernameInput = select(".input-username");
const passwordInput = select(".input-password");
const loginButton = select(".button-login");
const invalidLogin = select(".invalid-login");

// Store the user's login info in localStorage
localStorage.setItem("username", "jobseeker");
localStorage.setItem("password", "hired1234");

print(localStorage.getItem("username"));
print(localStorage.getItem("password"));

// Validate the user's login info
function validateLogin() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  print(username);
  print(password);

  if (
    username === localStorage.getItem("username") &&
    password === localStorage.getItem("password")
  ) {
    window.location.href = "home.html";
    invalidLogin.classList.add("hidden");
  } else {
    invalidLogin.classList.remove("hidden");
  }
}

// Login button event listener
onEvent("click", loginButton, validateLogin);

// When the user presses enter on the password input, validate the login
onEvent("keyup", passwordInput, (event) => {
  if (event.key === "Enter" && usernameInput.value.trim() !== "") {
    validateLogin();
  }
});

// When the user presses enter on the username input, validate the login
onEvent("keyup", usernameInput, (event) => {
  if (event.key === "Enter" && passwordInput.value.trim() !== "") {
    validateLogin();
  }
});

onEvent("input", usernameInput, () => {
  invalidLogin.classList.add("hidden");
});

onEvent("input", passwordInput, () => {
  invalidLogin.classList.add("hidden");
});
