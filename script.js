const cardsPerPage = 10;
let currentPage = 1;
let data = [];

// Title
const title = document.createElement('h1');
title.innerText = 'PAGINATION';
title.id = 'title';
document.body.appendChild(title);

// Description
const description = document.createElement('p');
description.id = 'description';
description.innerText = 'This is a pagination task';
document.body.appendChild(description);

// container to hold all cards
const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);



//  pagination div
const pagination = document.createElement('div');
pagination.className = 'pagination';
document.body.appendChild(pagination);

fetch('jsondata.txt')
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
    displayCards(currentPage);
    renderPagination();
  })
  .catch((err) => console.log('Error:', err));

function displayCards(page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const container = document.querySelector('.container');
  container.innerHTML = '';
  for (let i = startIndex; i < Math.min(endIndex, data.length); i++) {
    const element = data[i];
    const card = createCard(element);
    container.appendChild(card);
  }
}

function createCard(element) {
  const div = document.createElement('div');
  div.classList.add('container');
  div.innerHTML = `
        <table class="info">
          <tr>
            <td>ID :</td>
            <td>${element.id}</td>
          </tr>
          <tr>
            <td>Name :</td>
            <td>${element.name}</td>
          </tr>
          <tr>
            <td>E-Mail :</td>
            <td>${element.email}</td>
          </tr>
        </table>
      `;
  return div;
}

function renderPagination() {
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      displayCards(currentPage);
      highlightCurrentPageButton();
    });
    paginationContainer.appendChild(button);
  }
  highlightCurrentPageButton();
}

function highlightCurrentPageButton() {
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach((button, index) => {
    button.classList.toggle('active', index + 1 === currentPage);
    button.className = 'button';
  });
}