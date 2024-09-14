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
        const detailRestaurant = ramenDetailDiv.querySelector('.restaurant');
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

  newRamenForm.addEventListener('submit', (ramen) => {
    ramen.preventDefault();

    const newRamen = {
      name: ramen.target['name'].value,
      restaurant: ramen.target['restaurant'].value,
      image: ramen.target['image'].value,
      rating: ramen.target['rating'].value,
      comment: ramen.target['new-comment'].value,
    };

    console.log('New Ramen Object:', newRamen);

    const ramenMenuDiv = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;

    ramenMenuDiv.appendChild(img);
    console.log('Appended Image Element:', img);

    img.addEventListener('click', () => {
      console.log('Image clicked:', newRamen.name);

      const ramenDetailDiv = document.getElementById('ramen-detail');
      const detailImg = ramenDetailDiv.querySelector('.detail-image');
      const detailName = ramenDetailDiv.querySelector('.name');
      const detailRestaurant = ramenDetailDiv.querySelector('.restaurant');
      const detailsRating = ramenDetailDiv.querySelector('#rating-display');
      const detailsComment = ramenDetailDiv.querySelector('#comment-display');

      detailImg.src = newRamen.image;
      detailName.textContent = newRamen.name;
      detailRestaurant.textContent = newRamen.restaurant;
      detailsRating.textContent = newRamen.rating.toString();
      detailsComment.textContent = newRamen.comment;

      console.log('Updated Ramen Details:', {
        detailImg: detailImg.src,
        detailName: detailName.textContent,
        detailRestaurant: detailRestaurant.textContent,
        detailsRating: detailsRating.textContent,
        detailsComment: detailsComment.textContent,
      });
    });
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      
      ramenMenuDiv.innerHTML = '';

      data.forEach(ramen => {
        // Check if the ramen has a valid image URL
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
