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
description.innerText = 'This is a pagination task to display CARDs.';
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


// fetching data from given collection of object arrays using then and catch method
fetch('jsondata.txt')
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
    displayCards(currentPage);
    renderPagination();
  })
  .catch((err) => console.log('Error:', err));


// function to display cards in a container
function displayCards(page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  // const container = document.querySelector('.table-responsive');
  container.innerHTML = '';    // container with class .table-responsive (ref ln:23)
  for (let i = startIndex; i < Math.min(endIndex, data.length); i++) {
    const element = data[i];
    const card = createCard(element);
    container.appendChild(card);
  }
}


// function to create all the cards using table element
function createCard(element) {

  // Creating the container div to hold the table
  const div = document.createElement('div');
  div.classList.add('containerForTable');


  const table = document.createElement('table');
  table.className = 'table_table-bordered';

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


// function to implement pagination with buttons (First, Next, Previous, 1 to 10, Last)
function renderPagination() {
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const paginationContainer = document.querySelector('#buttons');


  // First Button
  const firstButton = document.createElement('button');
  firstButton.textContent = 'First';
  firstButton.className = 'pagination_button';
  firstButton.addEventListener('click', () => {
    currentPage = 1;
    displayCards(currentPage);
    highlightCurrentPageButton();
  })
  paginationContainer.appendChild(firstButton);


  // Next Button
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

  // Previous button
  const previousButton = document.createElement('button');
  previousButton.textContent = 'Prev';
  previousButton.className = 'pagination_button';
  previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayCards(currentPage);
      highlightCurrentPageButton();
    }
  });
  paginationContainer.appendChild(previousButton);

  // All buttons from 1 to 10
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

  // Last button
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


// To heighlight current button
function highlightCurrentPageButton() {
  const buttons = document.querySelectorAll('.pagination_button');
  buttons.forEach((button, index) => {

    if (parseInt(button.textContent) === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}


