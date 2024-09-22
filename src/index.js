// index.js
const ramenAPI = 'http://localhost:3000/ramens';
const ramenMenu = document.querySelector('#ramen-menu');

document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM loaded');
})
// Callbacks

const handleClick = (ramen) => {
  
}

const addSubmitListener = () => {
  
}


const displayRamens = () => {
  fetch(ramenAPI)
  .then(response => response.json())
  .then(getAllRamen)
};
function getAllRamen(ramen) {
  ramen.forEach(getRamen)
}
function getRamen(obj) {
  const ramenImg = document.createElement('img');
  ramenImg.src = obj.image;
  ramenMenu.append(ramenImg);

  ramenImg.addEventListener('click', () => {
    
  })
}


const main = () => {
  displayRamens();
  addSubmitListener();
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
