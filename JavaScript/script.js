const listContainer = document.getElementById('list-container');
const addBTN = document.getElementById('add-btn');

function Book(title, author) {
  this.title = title;
  this.author = author;
}

let booksData = [];

function addBook() {
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  
  if (title && author) {
    const newbook = new Book(title, author);
    booksData.push(newbook);
  }
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
}

function setToLocal() {
  localStorage.setItem('bookCollection', JSON.stringify(booksData));
}

function getFromLocal() {
  const getData = localStorage.getItem('bookCollection');
  if (getData) {
    booksData = JSON.parse(getData);
  }
}

function createDynamicBooks() {
  getFromLocal();
  listContainer.innerHTML = '';
  booksData.forEach((book, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('parent-list');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    contentContainer.appendChild(titleContainer);

    const bookName = document.createElement('h2');
    bookName.classList.add('book-name');
    bookName.textContent = book.title;
    titleContainer.appendChild(bookName);

    const authorContainer = document.createElement('div');
    authorContainer.classList.add('author-container');
    contentContainer.appendChild(authorContainer);

    const authorName = document.createElement('p');
    authorName.classList.add('author-name');
    authorName.textContent = book.author;
    authorContainer.appendChild(authorName);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const removeBTN = document.createElement('button');
    removeBTN.textContent = 'Remove';
    removeBTN.classList.add('remove-btn');
    removeBTN.addEventListener('click', () => removeBook(index));
    btnContainer.appendChild(removeBTN);

    listItem.appendChild(contentContainer);
    listItem.appendChild(btnContainer);

    listContainer.appendChild(listItem);
  });
}

addBTN.addEventListener('click', (e) => {
  e.preventDefault();
  addBook();
  setToLocal();
  createDynamicBooks();
})

function removeBook(index) {
  booksData = booksData.filter((book, i) => i !== index);
  setToLocal();
  createDynamicBooks();
}