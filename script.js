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
  collection.booklist = JSON.parse(localStorage.getItem('data'));
}

function removeElement(event) {
  collection.removeBook(event.target.className);
  const containertoremove = document.querySelector(`.${event.target.className}`);
  containertoremove.remove();

  localStorage.setItem('data', JSON.stringify(collection.booklist));
}

function addtocollection() {
  const booktoadd = new Book(inputtitle.value, inputauthor.value);
  collection.addBook(booktoadd);

  const container = document.createElement('div');
  container.className = `container ${booktoadd.title}`;
  books.appendChild(container);

  const bookdescription = document.createElement('p');
  bookdescription.innerHTML = `"${booktoadd.title}" by ${booktoadd.author}`;
  container.appendChild(bookdescription);

  const buttonremove = document.createElement('button');
  buttonremove.innerHTML = 'Remove';
  buttonremove.classList = booktoadd.title;
  buttonremove.addEventListener('click', removeElement);
  container.appendChild(buttonremove);

  inputtitle.value = '';
  inputauthor.value = '';
  localStorage.setItem('data', JSON.stringify(collection.booklist));
}

function updatePage() {
  for (let i = 0; i < collection.booklist.length; i += 1) {
    const container = document.createElement('div');
    container.className = `container ${collection.booklist[i].title}`;
    books.appendChild(container);

    const bookdescription = document.createElement('p');
    bookdescription.innerHTML = `"${collection.booklist[i].title}" by ${collection.booklist[i].author}`;
    container.appendChild(bookdescription);

    const buttonremove = document.createElement('button');
    buttonremove.innerHTML = 'Remove';
    buttonremove.classList = collection.booklist[i].title;
    buttonremove.addEventListener('click', removeElement);
    container.appendChild(buttonremove);
  }
}

addButton.addEventListener('click', addtocollection);

updatePage();
