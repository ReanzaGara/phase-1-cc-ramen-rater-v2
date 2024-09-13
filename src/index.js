// index.js



// Callbacks
const handleClick = (ramen) => {
  const clickedRamenId = ramen.target.dataset.id;

  fetch(`http://localhost:3000/ramens`)
    .then(response => response.json())
    .then(ramens => {
      
      const selectedRamen = ramens.find(ramen => ramen.id == clickedRamenId);

      if (selectedRamen) {
        const ramenDetailDiv = document.getElementById('ramen-detail');
        const detailImg = ramenDetailDiv.querySelector('.detail-image');
        const detailName = ramenDetailDiv.querySelector('.name');
        const detailRestaurant = ramenDetailDiv.querySelector('.restaurant'); // Fixed selector
        const detailRating = ramenDetailDiv.querySelector('#rating-display');
        const detailComment = ramenDetailDiv.querySelector('#comment-display');

        detailImg.src = selectedRamen.image || '';
        detailName.textContent = selectedRamen.name || 'No Name';
        detailRestaurant.textContent = selectedRamen.restaurant || 'No Restaurant';
        detailRating.textContent = selectedRamen.rating || 'No Rating';
        detailComment.textContent = selectedRamen.comment || 'No comment';
      }
    })
    .catch(error => console.error('Error fetching ramen data:', error));
};

const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  
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
