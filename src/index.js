// index.js

// Callbacks
const handleClick = (ramen) => {
  //get ramen image
  const clickedRamen = ramen.target;
  //get ramen details from server
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramen => {
    //display each ramen detail
    const ramenDetailDiv = document.getElementById('ramen-detail');
    ramenDetailDiv.querySelector('.detail-image').src=ramen.image;
    ramenDetailDiv.querySelector('.name').textContent=ramen.name;
    ramenDetailDiv.querySelector('.restaurant').textContent=ramen.restaurant;
    ramenDetailDiv.querySelector('#rating-display').textContent=ramen.rating;
    ramenDetailDiv.querySelector('#comment-display').textContent=ramen.comment;
  })
};

const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', (ramen) => {
    ramen.preventDefault();
  })
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      
      ramenMenuDiv.innerHTML = '';

      data.forEach(ramen => {
        // Check if the ramen object has a valid image URL
        if (ramen.image) {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.dataset.id = ramen.id;
          img.addEventListener('click', handleClick);
          ramenMenuDiv.appendChild(img);
        } else {
          console.error(`Ramen object missing image field:`, ramen);
        }
      });
    })
};


const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
  })
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
