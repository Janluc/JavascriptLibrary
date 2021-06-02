let myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function displayBooks() {
  let content = document.querySelector("#content");
  for(let book in myLibrary) {
    let container = document.createElement('div');

    let title = document.createElement('h4');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('p');

    title.textContent = myLibrary[book].title;
    author.textContent = 'Author: ' + myLibrary[book].author;
    pages.textContent = 'Number of Pages: ' + myLibrary[book].pages;

    container.append(title, author, pages, read);
    content.appendChild(container);
  }
}

let theHobbit = new Book('J.R.R Tolkien', 'The Hobbit', 297, false);
let metamorphosis = new Book('Franz Kafka', 'The Metamorphosis', 102, true);
addBookToLibrary(theHobbit);
addBookToLibrary(metamorphosis);
displayBooks();