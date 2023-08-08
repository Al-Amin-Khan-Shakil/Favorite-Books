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

