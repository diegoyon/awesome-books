export default class BookCollection {
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