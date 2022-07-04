import Book from './modules/Book.js';
import BookCollection from './modules/BookCollection.js';
import { displayList, displayAddNew, displayContact} from './modules/display.js';

const books = document.querySelector('.book-collection');
const addButton = document.querySelector('.add');
const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const collection = new BookCollection();

if (localStorage.getItem('data') !== null) {
  // If there is data stored, set collection to that data
  collection.booklist = JSON.parse(localStorage.getItem('data'));
}

function removeElement(event) {
  // Remove book from collection
  collection.removeBook(event.target.className);

  // Remove book from DOM
  const containerToRemove = document.querySelector(`.${event.target.className}`);
  containerToRemove.remove();

  // Store new collection in Local Storage
  localStorage.setItem('data', JSON.stringify(collection.booklist));
}

function createBookElement(bookName, bookAuthor) {
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

function addToCollection() {
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

function updatePage() {
  // Updates the page if there is data stored in Local Storage
  for (let i = 0; i < collection.booklist.length; i += 1) {
    createBookElement(collection.booklist[i].title, collection.booklist[i].author);
  }
}

addButton.addEventListener('click', addToCollection);
updatePage();

//Change what to display on screen using the navbar
const list = document.querySelector('.list');
const addNew = document.querySelector('.new');
const contact = document.querySelector('.contact');

list.onclick = displayList;
addNew.onclick = displayAddNew;
contact.onclick = displayContact;

//Display date
const date = document.querySelector('.date');
const dateToDisplay = new Date();
date.innerHTML = dateToDisplay;