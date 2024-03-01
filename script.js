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
container.classList.add('table-responsive');
document.body.appendChild(container);



//  pagination div
const pagination = document.createElement('div');
pagination.id = 'buttons';
pagination.className = 'd-flex justify-content-center';
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
  const container = document.querySelector('.table-responsive');
  container.innerHTML = '';
  for (let i = startIndex; i < Math.min(endIndex, data.length); i++) {
    const element = data[i];
    const card = createCard(element);
    container.appendChild(card);
  }
}



function createCard(element) {

  // Creating the container div to hold the table
  const div = document.createElement('div');
  div.classList.add('container');


  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Creating table using template literals
  table.innerHTML = `
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
  `;


  div.appendChild(table);

  return div;
}



// function createCard(element) {
//   const div = document.createElement('div');
//   div.classList.add('container');
//   div.innerHTML = `
//         <table class="info">
//           <tr> 
//             <td>ID :</td>
//             <td>${element.id}</td>
//           </tr>
//           <tr>
//             <td>Name :</td>
//             <td>${element.name}</td>
//           </tr>
//           <tr>
//             <td>E-Mail :</td>
//             <td>${element.email}</td>
//           </tr>
//         </table>
//       `;
//   return div;
// }



function renderPagination() {
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const paginationContainer = document.querySelector('#buttons');
  // paginationContainer.innerHTML = '';

  const firstButton = document.createElement('button');
  firstButton.textContent = 'First';
  firstButton.className = 'pagination_button';
  firstButton.addEventListener('click', () => {
    currentPage = 1;
    displayCards(currentPage);
    highlightCurrentPageButton();
  })
  paginationContainer.appendChild(firstButton);



  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.className = 'pagination_button';
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayCards(currentPage);
      highlightCurrentPageButton();
    }
  });
  paginationContainer.appendChild(nextButton);


  const previousButton = document.createElement('button');
  previousButton.textContent = 'Previous';
  previousButton.className = 'pagination_button';
  previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayCards(currentPage);
      highlightCurrentPageButton();
    }
  });
  paginationContainer.appendChild(previousButton);


  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.className = 'pagination_button';
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      displayCards(currentPage);
      highlightCurrentPageButton();
    });
    paginationContainer.appendChild(button);
  }


  const lastButton = document.createElement('button');
  lastButton.textContent = 'Last';
  lastButton.className = 'pagination_button';
  lastButton.addEventListener('click', () => {
    currentPage = totalPages;
    displayCards(currentPage);
    highlightCurrentPageButton();
  })
  paginationContainer.appendChild(lastButton);

  highlightCurrentPageButton();
}


function highlightCurrentPageButton() {
  const buttons = document.querySelectorAll('.pagination_button');
  buttons.forEach((button, index) => {
    button.classList.toggle('active', index + 1 === currentPage);
    // button.className = 'button';
  });
}