// Array of books
let collection;

const books = document.querySelector('.book-collection');

const add = document.querySelector('.button');

const inputtitle = document.querySelector('.input-title');
const inputauthor = document.querySelector('.input-author');

if (localStorage.getItem('data') === null) {
  collection = [];
} else {
  collection = JSON.parse(localStorage.getItem('data'));
}
function addBook(title, author) {
  const book = {};
  book.title = title;
  book.author = author;
  collection.push(book);
}

function removeBook(title) {
  collection = collection.filter((book) => book.title !== title);
}

function remove(event) {
  removeBook(event.target.className);
  books.innerHTML = '';
  for (let i = 0; i < collection.length; i += 1) {
    const titledisplay = document.createElement('p');
    titledisplay.innerText = collection[i].title;
    const authordisplay = document.createElement('p');
    authordisplay.innerText = collection[i].author;

    books.appendChild(titledisplay);
    books.appendChild(authordisplay);
    const buttonremove = document.createElement('button');
    buttonremove.innerHTML = 'remove';
    buttonremove.classList = collection[i].title;
    buttonremove.addEventListener('click', remove);
    books.appendChild(buttonremove);
    const line = document.createElement('hr');
    books.appendChild(line);
  }

  inputtitle.value = '';
  inputauthor.value = '';
  localStorage.setItem('data', JSON.stringify(collection));
}

function refreshPage() {
  books.innerHTML = '';
  for (let i = 0; i < collection.length; i += 1) {
    const titledisplay = document.createElement('p');
    titledisplay.innerText = collection[i].title;
    const authordisplay = document.createElement('p');
    authordisplay.innerText = collection[i].author;

    books.appendChild(titledisplay);
    books.appendChild(authordisplay);
    const buttonremove = document.createElement('button');
    buttonremove.innerHTML = 'remove';
    buttonremove.classList = collection[i].title;
    buttonremove.addEventListener('click', remove);
    books.appendChild(buttonremove);
    const line = document.createElement('hr');
    books.appendChild(line);
  }

  inputtitle.value = '';
  inputauthor.value = '';
  localStorage.setItem('data', JSON.stringify(collection));
}

function addtocollection() {
  addBook(inputtitle.value, inputauthor.value);
  refreshPage();
}

add.addEventListener('click', addtocollection);

// storage

refreshPage();
