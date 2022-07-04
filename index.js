import Book from './modules/Book.js';
import BookCollection from './modules/BookCollection.js';

const books = document.querySelector('.book-collection');
const addButton = document.querySelector('.add');
const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const collection = new BookCollection();

if (localStorage.getItem('data') !== null) {
  // If there is data stored, set collection to that data
  collection.booklist = JSON.parse(localStorage.getItem('data'));
}

const removeElement = (event) => {
  // Remove book from collection
  collection.removeBook(event.target.className);

  // Remove book from DOM
  const containerToRemove = document.querySelector(`.${event.target.className}`);
  containerToRemove.remove();

  // Store new collection in Local Storage
  localStorage.setItem('data', JSON.stringify(collection.booklist));
}

const createBookElement = (bookName, bookAuthor) => {
  // Create container of book description and remove button
  const container = document.createElement('div');
  container.className = `container ${bookName}`;
  books.appendChild(container);

  // Create book description element
  const bookdescription = document.createElement('p');
  bookdescription.innerHTML = `"${bookName}" by ${bookAuthor}`;
  container.appendChild(bookdescription);

  // Create remove button element
  const buttonremove = document.createElement('button');
  buttonremove.innerHTML = 'Remove';
  buttonremove.classList = bookName;
  buttonremove.addEventListener('click', removeElement);
  container.appendChild(buttonremove);
}

const addToCollection =() => {
  // Add book to collection
  const bookToAdd = new Book(inputTitle.value, inputAuthor.value);
  collection.addBook(bookToAdd);

  // Add book to DOM
  createBookElement(bookToAdd.title, bookToAdd.author);

  // Reset input values
  inputTitle.value = '';
  inputAuthor.value = '';

  // Store new collection in Local Storage
  localStorage.setItem('data', JSON.stringify(collection.booklist));
}

const updatePage = () => {
  // Updates the page if there is data stored in Local Storage
  for (let i = 0; i < collection.booklist.length; i += 1) {
    createBookElement(collection.booklist[i].title, collection.booklist[i].author);
  }
}

//Adds listener to the add button
addButton.addEventListener('click', addToCollection);

//Updates the page with localStorage data
updatePage();

//Change what to display on screen using the navbar
const list = document.querySelector('.list');
const addNew = document.querySelector('.new');
const contact = document.querySelector('.contact');

import { displayList, displayAddNew, displayContact} from './modules/display.js';

list.onclick = displayList;
addNew.onclick = displayAddNew;
contact.onclick = displayContact;

//Use of luxon to get date
import { DateTime } from "./modules/luxon.js";
const date = document.querySelector('.date');

//Function to constantly update time after one second
const runTime =() => {
  const dateToDisplay = DateTime.now();
  date.innerHTML = dateToDisplay.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  setTimeout(function (){
    runTime();
  },1000)
}

runTime();