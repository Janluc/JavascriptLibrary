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

let newBookBtn = document.querySelector('#form-button');

newBookBtn.addEventListener('click', () => {
  if(!document.querySelector('form')) {
    newBookBtn.textContent = 'CANCEL';
    let form = document.createElement('form');
    
    let addNew = document.createElement('h4');
    addNew.textContent = 'Add a book to your library';

    let title = document.createElement('input');
    title.setAttribute('id', 'title');
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', 'Title');

    let author = document.createElement('input');
    author.setAttribute('id', 'author');
    author.setAttribute('type','text');
    author.setAttribute('placeholder', 'Author');

    let pages = document.createElement('input');
    pages.setAttribute('id', 'pages');
    pages.setAttribute('type', 'number');
    pages.setAttribute('placeholder', 'Number of Pages'); 

    let read = document.createElement('input');
    read.setAttribute('id', 'read');
    read.setAttribute('type', 'checkbox');

    let submit = document.createElement('input')
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

function onSubmitForm(event) {
  event.preventDefault();

  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('#read').checked;

  if (!title || !author || !pages) {
    if (!document.querySelector('#error')) {
      let error = document.createElement('p');
      error.setAttribute('id', 'error');
      error.textContent = 'No field can be left blank';
      document.querySelector('form').prepend(error); 
    }
  } else {
    let book = new Book(author, title, pages, read);
    addBookToLibrary(book);
    updateLibrary();
    document.querySelector('form').remove();
    newBookBtn.textContent = 'NEW BOOK'
  }
};

function removeChildren(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

function updateLibrary() {
  removeChildren(document.querySelector('#content'));
  displayBooks();
};

let theHobbit = new Book('J.R.R Tolkien', 'The Hobbit', 297, false);
let metamorphosis = new Book('Franz Kafka', 'The Metamorphosis', 102, true);
addBookToLibrary(theHobbit);
addBookToLibrary(metamorphosis);
displayBooks();