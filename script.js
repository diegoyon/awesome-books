class Book{
  constructor(title, author){
    this.title = title;
    this.author = author;
  }
}

class BookCollection{
  constructor(){
    this.booklist = [];
  }

  addBook(book){
    this.booklist.push(book);
  }

  removeBook(booktitle){
    this.booklist = this.booklist.filter(book => book.title !== booktitle)
  }
}

const books = document.querySelector('.book-collection');
const add = document.querySelector('.button');
const inputtitle = document.querySelector('.input-title');
const inputauthor = document.querySelector('.input-author');

let collection = new BookCollection;

if (localStorage.getItem('data') !== null) {
  collection.booklist = JSON.parse(localStorage.getItem('data'));
}

function remove(event) {
  collection.removeBook(event.target.className);
  refreshPage();
}

function refreshPage() {
  books.innerHTML = '';
  for (let i = 0; i < collection.booklist.length; i += 1) {
    const container = document.createElement('div');
    container.className = 'container';
    books.appendChild(container);

    const titledisplay = document.createElement('p');
    titledisplay.innerHTML = `"${collection.booklist[i].title}" by ${collection.booklist[i].author}`;
    container.appendChild(titledisplay);

    const buttonremove = document.createElement('button');
    buttonremove.innerHTML = 'Remove';
    buttonremove.classList = collection.booklist[i].title;
    buttonremove.addEventListener('click', remove);
    container.appendChild(buttonremove);
  }

  inputtitle.value = '';
  inputauthor.value = '';
  localStorage.setItem('data', JSON.stringify(collection.booklist));
}

function addtocollection() {
  let booktoadd = new Book(inputtitle.value, inputauthor.value);
  collection.addBook(booktoadd);
  refreshPage();
}

add.addEventListener('click', addtocollection);

refreshPage();
