// index.js

// Callbacks
const handleClick = (ramen) => {
  const clickedRamenId = ramen.target.dataset.ramenId;
};

const addSubmitListener = () => {
  // Add code
}

const displayRamens = () => {
  const ramenMenuDiv = document.querySelector('#ramen-menu');

  displayRamens.forEach((ramen) => {
    const ramenImage = document.createElement('img');
    ramenImage.src = ramen.image;
    ramenImage.alt = ramen.name;
    ramenImage.dataset.ramenId = ramen.id;
    ramenImage.addEventListener('click', handleClick);
    ramenMenuDiv.appendChild(ramenImage);
  })
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
