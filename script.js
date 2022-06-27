// Array of books
let collection = [];

function addBook(title, author){
  let book = {};
  book.title = title;
  book.author = author;
  collection.push(book);
}

function removeBook(title){
  collection = collection.filter(book => book.title !== title);
}