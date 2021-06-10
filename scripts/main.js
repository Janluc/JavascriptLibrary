const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.updateBookRead = function updateBookRead() {
  if (this.read) {
    this.read = false;
  } else {
    this.read = true;
  }
};

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateLibrary() {
  removeChildren(document.querySelector('#content'));
  // eslint-disable-next-line no-use-before-define
  displayBooks();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function deleteBook(event) {
  const index = event.target.parentNode.dataset.indexNumber;
  myLibrary.splice(index, 1);
  updateLibrary();
}

function changeReadStatus(event) {
  const index = event.target.parentNode.dataset.indexNumber;
  myLibrary[index].updateBookRead();
  updateLibrary();
}

const newBookBtn = document.querySelector('#form-button');

function onSubmitForm(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

  if (!title || !author || !pages) {
    if (!document.querySelector('#error')) {
      const error = document.createElement('p');
      error.setAttribute('id', 'error');
      error.textContent = 'No field can be left blank';
      document.querySelector('form').prepend(error);
    }
  } else {
    const book = new Book(author, title, pages, read);
    addBookToLibrary(book);
    updateLibrary();
    document.querySelector('form').remove();
    newBookBtn.textContent = 'NEW BOOK';
  }
}

newBookBtn.addEventListener('click', () => {
  if (!document.querySelector('form')) {
    newBookBtn.textContent = 'CANCEL';
    const form = document.createElement('form');

    const addNew = document.createElement('h4');
    addNew.textContent = 'Add a book to your library';

    const title = document.createElement('input');
    title.setAttribute('id', 'title');
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', 'Title');

    const author = document.createElement('input');
    author.setAttribute('id', 'author');
    author.setAttribute('type', 'text');
    author.setAttribute('placeholder', 'Author');

    const pages = document.createElement('input');
    pages.setAttribute('id', 'pages');
    pages.setAttribute('type', 'number');
    pages.setAttribute('placeholder', 'Number of Pages');

    const read = document.createElement('input');
    read.setAttribute('id', 'read');
    read.setAttribute('type', 'checkbox');

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'SUBMIT');
    submit.addEventListener('click', onSubmitForm);

    form.append(addNew, title, author, pages, document.createElement('label').textContent = 'Book read?', read, submit);
    document.querySelector('body').appendChild(form);
  } else {
    document.querySelector('form').remove();
    newBookBtn.textContent = 'NEW BOOK';
  }
});

function displayBooks() {
  const content = document.querySelector('#content');
  let index = 0;
  Object.keys(myLibrary).forEach((book) => {
    if (Book.prototype.hasOwnProperty.call(myLibrary, book)) {
      const container = document.createElement('div');
      container.setAttribute('data-index-number', index);

      const title = document.createElement('h4');
      const author = document.createElement('p');
      const pages = document.createElement('p');
      const read = document.createElement('p');

      const deleteBtn = document.createElement('button');
      deleteBtn.addEventListener('click', deleteBook);
      deleteBtn.textContent = 'Delete Book';

      const readBtn = document.createElement('button');
      readBtn.addEventListener('click', changeReadStatus);

      title.textContent = myLibrary[book].title;
      author.textContent = `Author: ${myLibrary[book].author}`;
      pages.textContent = `Number of Pages: ${myLibrary[book].pages}`;

      if (myLibrary[book].read) {
        read.textContent = 'Already read';
        readBtn.textContent = 'Not read';
      } else {
        read.textContent = 'Not yet read';
        readBtn.textContent = 'Book read';
      }

      container.append(title, author, pages, read, deleteBtn, readBtn);
      content.appendChild(container);

      index += 1;
    }
  });
}

const theHobbit = new Book('J.R.R Tolkien', 'The Hobbit', 297, false);
const metamorphosis = new Book('Franz Kafka', 'The Metamorphosis', 102, true);
addBookToLibrary(theHobbit);
addBookToLibrary(metamorphosis);
displayBooks();