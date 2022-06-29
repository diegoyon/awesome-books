/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.booklist = [];
  }

  addBook(book) {
    this.booklist.push(book);
  }

  removeBook(booktitle) {
    this.booklist = this.booklist.filter((book) => book.title !== booktitle);
  }
}

const books = document.querySelector('.book-collection');
const addButton = document.querySelector('.add');
const inputtitle = document.querySelector('.input-title');
const inputauthor = document.querySelector('.input-author');
const collection = new BookCollection();

if (localStorage.getItem('data') !== null) {
  // If there is data stored, set collection to that data
  collection.booklist = JSON.parse(localStorage.getItem('data'));
}

function removeElement(event) {
  // Remove book from collection
  collection.removeBook(event.target.className);

  // Remove book from DOM
  const containertoremove = document.querySelector(`.${event.target.className}`);
  containertoremove.remove();

  // Store new collection in Local Storage
  localStorage.setItem('data', JSON.stringify(collection.booklist));
}

function createBookElement(bookname, bookauthor) {
  // Create container of book description and remove button
  const container = document.createElement('div');
  container.className = `container ${bookname}`;
  books.appendChild(container);

  // Create book description element
  const bookdescription = document.createElement('p');
  bookdescription.innerHTML = `"${bookname}" by ${bookauthor}`;
  container.appendChild(bookdescription);

  // Create remove button element
  const buttonremove = document.createElement('button');
  buttonremove.innerHTML = 'Remove';
  buttonremove.classList = bookname;
  buttonremove.addEventListener('click', removeElement);
  container.appendChild(buttonremove);
}

function addtocollection() {
  // Add book to collection
  const booktoadd = new Book(inputtitle.value, inputauthor.value);
  collection.addBook(booktoadd);

  // Add book to DOM
  createBookElement(booktoadd.title, booktoadd.author);

  // Reset input values
  inputtitle.value = '';
  inputauthor.value = '';

  // Store new collection in Local Storage
  localStorage.setItem('data', JSON.stringify(collection.booklist));
}

function updatePage() {
  // Updates the page if there is data stored in Local Storage
  for (let i = 0; i < collection.booklist.length; i += 1) {
    createBookElement(collection.booklist[i].title, collection.booklist[i].author);
  }
}

addButton.addEventListener('click', addtocollection);
updatePage();

const list = document.querySelector('.list');
const addNew = document.querySelector('.new');
const contact = document.querySelector('.contact');

const listSection = document.querySelector('.booklist');
const formSection = document.querySelector('.form');
const contactSection = document.querySelector('.contact-information');

function displaylist(){
  listSection.classList.remove('noshow');
  formSection.classList.add('noshow');
  contactSection.classList.add('noshow');
}

function displayaddnew(){
  listSection.classList.add('noshow');
  formSection.classList.remove('noshow');
  contactSection.classList.add('noshow');
}

function displaycontact(){
  listSection.classList.add('noshow');
  formSection.classList.add('noshow');
  contactSection.classList.remove('noshow');
}

list.onclick = displaylist;
addNew.onclick = displayaddnew;
contact.onclick = displaycontact;