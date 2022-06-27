"use strict";
// Array of books
let collection;

if (localStorage.getItem("data") === null) {
  collection = [];
} else {
  collection = JSON.parse(localStorage.getItem("data"));
}
function addBook(title, author) {
  let book = {};
  book.title = title;
  book.author = author;
  collection.push(book);
}

function removeBook(title) {
  collection = collection.filter((book) => book.title !== title);
}

const books = document.querySelector(".book-collection");

const add = document.querySelector(".button");

const inputtitle = document.querySelector(".input-title");
const inputauthor = document.querySelector(".input-author");

add.addEventListener("click", addtocollection);

function addtocollection() {
  addBook(inputtitle.value, inputauthor.value);
  refreshPage();
}

function remove(event) {
  removeBook(event.target.className);
  refreshPage();
}

function refreshPage() {
  books.innerHTML = "";
  for (let i = 0; i < collection.length; i++) {
    const titledisplay = document.createElement("h2");
    titledisplay.innerText = collection[i].title;
    const authordisplay = document.createElement("h3");
    authordisplay.innerText = collection[i].author;

    books.appendChild(titledisplay);
    books.appendChild(authordisplay);
    const buttonremove = document.createElement("button");
    buttonremove.innerHTML = "remove";
    buttonremove.classList = collection[i].title;
    buttonremove.addEventListener("click", remove);
    books.appendChild(buttonremove);
    const line = document.createElement("hr");
    books.appendChild(line);
  }

  inputtitle.value = "";
  inputauthor.value = "";
  localStorage.setItem("data", JSON.stringify(collection));
}
//storage

refreshPage();
