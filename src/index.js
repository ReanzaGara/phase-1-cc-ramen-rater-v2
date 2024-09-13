// index.js

// Callbacks
const handleClick = (ramen) => {
  const clickedRamen = ramen.target;
  fetch(`http://localhost:3000/ramens`)
  .then(response => response.json())
  .then(ramen => {
    const ramenDetailDiv = document.getElementById('ramen-detail');
    const detailImg = ramenDetailDiv.querySelector('.detail-image');
    const detailName = ramenDetailDiv.querySelector('.name');
    const detailRestaurant = ramenDetailDiv.querySelector('restaurant');
    const detailRating = ramenDetailDiv.querySelector('#rating-display');
    const detailComment = ramenDetailDiv.querySelector('#comment-display');
console.log('fetched ramen:', ramen);
    detailImg.src = ramen.img || '';
    detailName.textContent = ramen.name || 'No Name';
    detailRestaurant.textContent = ramen.restaurant || 'No Restaurant';
    detailRating.textContent = ramen.rating || 'No Rating';
    detailComment.textContent = ramen.comment || 'No comment';
  })

};

const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', (ramen) => {
    ramen.preventDefault();

    const newRamen = {
      name: ramen.taget['name'].value,
      restaurant: ramen.taget['restaurant'].value,
      image: ramen.taget['image'].value,
      rating: ramen.target['rating'].value,
      comment: ramen.target['new-comment'].value,
    };

    const ramenMenuDiv = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => {
      const ramenDetailDiv = document.getElementById('ramen-detail');
      ramenDetailDiv.querySelector('.detail-image').src = ramen.image;
      ramenDetailDiv.querySelector('.name').src = ramen.name;
      ramenDetailDiv.querySelector('.restaurant').textContent = ramen.name;
      ramenDetailDiv.querySelector('#rating-display').textContent = ramen.rating;
      ramenDetailDiv.querySelector('#comment-display').textContent = ramen.comment;
    })

    ramenMenuDiv.appendChild(img);
    newRamenForm.reset();
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
