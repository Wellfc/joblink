"use strict";

import { onEvent, select, sleep, print, create } from "./utils.js";

const usersContainer = select(".users-container");
const spinner = select(".spinner");

const URLUSERS = "https://randomuser.me/api/?nat=CA&results=10&seed=same";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  mode: "cors",
};

async function getUsers() {
  try {
    const result = await fetch(URLUSERS, options);
    if (!result.ok) {
      throw new Error(`${result.statusText} (${result.status})`);
    }

    const users = await result.json();
    const list = users.results;
    setUsers(list);
    console.log(list);
  } catch (error) {
    console.error(error.message);
  }
}

function setUsers(users) {
  // Show the spinner while data is loading
  showSpinner();

  // Clear existing content in the usersContainer
  // usersContainer.innerHTML = "";

  // Create and append <li> elements for each user
  users.forEach((user) => {
    const div = create("div");
    div.classList.add("user");
    usersContainer.appendChild(div);

    // Create and append <img> elements for each user
    const img = create("img");
    img.src = user.picture.large;
    img.alt = `${user.name.first} ${user.name.last}`;
    div.appendChild(img);

    // Create and append <li> elements for each user
    const li = create("li");
    li.textContent = `${user.name.first} ${user.name.last}`;
    div.appendChild(li);

    const plusIcon = create("i");
    plusIcon.classList.add("fa-solid", "fa-circle-plus");
    div.appendChild(plusIcon);

    // Create and append <li> elements for each user
    const liCity = create("li");
    liCity.textContent = `${user.location.state}`;
    div.appendChild(liCity);
  });

  // Hide the spinner after data is loaded
  hideSpinner();
}

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

// Fetch and display users on page load
getUsers();

// ! Posting functionality -----------------------------------------------------

let file = null;
const fileName = select("#file-name");
const postButton = select(".post-button");
const textArea = select("#posting");
const inputFile = select("#file");
const posts = select(".posting-area-past-posts-container");
let isFileSelected = false;
let userDisplayName = "Maya Miller";

// Functions

// Clear the text area and file input
function clearInputs() {
  textArea.value = "";
  fileName.innerHTML = `<i class="fas fa-upload"></i>`;
  isFileSelected = false;
}

// Get the current date
function getDate() {
  const parameters = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date().toLocaleDateString("en-ca", parameters);
}

// Display the file name when a file is selected
function displayFileName() {
  file = inputFile.files[0];
  fileName.textContent = file.name;
  isFileSelected = true;
}

// Create a new post when the post button is clicked
function newPost() {
  // Validate the text area and file input before creating a new post
  if (textArea.value.trim() !== "" || isFileSelected) {
    const post = create("div");
    if (isFileSelected) {
      const postImg = create("img");
      postImg.src = URL.createObjectURL(file);
      post.innerHTML = getPostHtml(userDisplayName, getDate(), textArea.value.trim(), postImg.src);
    } else {
      post.innerHTML = getPostHtml(userDisplayName, getDate(), textArea.value.trim());
    }
    posts.prepend(post);
    clearInputs();
  } else {
    textArea.focus();
  }
}

// Get the post HTML element
function getPostHtml(user, date, text, img = "") {
  return `
    <div class="post-container">
      <div class="post-header-container">
        <div class="post-photo-and-information">
          <img src="./assets/media/images/profile-mock.jpeg" alt="Post User Photo">
          <div>
            <p>${user}</p>
            <p>Software Developer</p>
          </div>
        </div>
        <div class="post-options">
          <i class="fa-solid fa-ellipsis"></i>
          <p>${date}</p>
        </div>
      </div>
      <div class="post-media-container">
        <p>${text}</p>
        <img src="${img}" alt="">
      </div>
      <div class="interactions-container">
        <i class="fa-solid fa-heart"></i>
        <i class="fa-regular fa-comment"></i>
        <i class="fa-solid fa-share-nodes"></i>
      </div>
    </div>
  `;
}

// Event listeners

onEvent("click", postButton, newPost);
onEvent("change", inputFile, displayFileName);
