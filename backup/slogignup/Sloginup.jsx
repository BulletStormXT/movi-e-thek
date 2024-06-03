import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Sloginup.css";

function showForm(formType) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const toggleText = document.getElementById("toggle-text");

  if (formType === "login") {
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
    toggleText.innerHTML =
      'Don\'t have an Account? <a href="#" onclick="showForm(\'signup\')">Go to Signup</a>';
  } else {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    toggleText.innerHTML =
      'Already have an Account? <a href="#" onclick="showForm(\'login\')">Go to Login</a>';
  }

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  document
    .querySelector(`.tab[onclick="showForm('${formType}')"]`)
    .classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.className = "container sloginup";

  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "Mov3thek";
  header.appendChild(title);

  const select = document.createElement("select");
  const option = document.createElement("option");
  option.value = "select";
  option.textContent = "select";
  select.appendChild(option);
  header.appendChild(select);

  container.appendChild(header);

  const formContainer = document.createElement("div");
  formContainer.className = "form-container";

  const tabs = document.createElement("div");
  tabs.className = "tabs";

  const loginTab = document.createElement("button");
  loginTab.className = "tab active";
  loginTab.textContent = "Login";
  loginTab.onclick = () => showForm("login");
  tabs.appendChild(loginTab);

  const signupTab = document.createElement("button");
  signupTab.className = "tab";
  signupTab.textContent = "Signup";
  signupTab.onclick = () => showForm("signup");
  tabs.appendChild(signupTab);

  formContainer.appendChild(tabs);

  const loginForm = document.createElement("form");
  loginForm.id = "login-form";
  loginForm.className = "form active";

  const loginEmail = document.createElement("input");
  loginEmail.type = "email";
  loginEmail.placeholder = "example@here.com";
  loginEmail.required = true;
  loginForm.appendChild(loginEmail);

  const loginPassword = document.createElement("input");
  loginPassword.type = "password";
  loginPassword.placeholder = "Password";
  loginPassword.required = true;
  loginForm.appendChild(loginPassword);

  const forgotPassword = document.createElement("a");
  forgotPassword.href = "#";
  forgotPassword.textContent = "Forgot password?";
  loginForm.appendChild(forgotPassword);

  const loginButton = document.createElement("button");
  loginButton.type = "submit";
  loginButton.textContent = "Login";
  loginForm.appendChild(loginButton);

  formContainer.appendChild(loginForm);

  const signupForm = document.createElement("form");
  signupForm.id = "signup-form";
  signupForm.className = "form";

  const signupEmail = document.createElement("input");
  signupEmail.type = "email";
  signupEmail.placeholder = "example@here.com";
  signupEmail.required = true;
  signupForm.appendChild(signupEmail);

  const signupPassword = document.createElement("input");
  signupPassword.type = "password";
  signupPassword.placeholder = "Password";
  signupPassword.required = true;
  signupForm.appendChild(signupPassword);

  const confirmPassword = document.createElement("input");
  confirmPassword.type = "password";
  confirmPassword.placeholder = "Confirm password";
  confirmPassword.required = true;
  signupForm.appendChild(confirmPassword);

  const signupButton = document.createElement("button");
  signupButton.type = "submit";
  signupButton.textContent = "Signup";
  signupForm.appendChild(signupButton);

  formContainer.appendChild(signupForm);

  const toggleText = document.createElement("p");
  toggleText.id = "toggle-text";
  toggleText.innerHTML =
    'Don\'t have an Account? <a href="#" onclick="showForm(\'signup\')">Go to Signup</a>';
  formContainer.appendChild(toggleText);

  container.appendChild(formContainer);
  document.body.appendChild(container);
});

export { showForm };
