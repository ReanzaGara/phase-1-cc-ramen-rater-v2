// index.js

// Callbacks
const handleClick = (ramen) => {
  const clickedRamen = ramen.target;
  const ramenDetailDiv = document.getElementById('ramen-detail');
};
ramenDetailDiv.innerHTML = '<img src="${clickedRamen.src}" alt="Ramen Image">';

const addSubmitListener = () => {
  const newRamenForm = document.getElementById('#new-ramen');
  newRamenForm.addEventListener('submit', function(ramen) {
    ramen.preventDefault();
  })
}

const displayRamens =() => {
  fetch('/ramen')
  .then(response => response.json())
  .then(data => {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    data.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.addEventListener('click', handleClick);
      ramenMenuDiv.appendChild(img);
    })
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
