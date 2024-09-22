// index.js
const ramenAPI = 'http://localhost:3000/ramens';
const ramenMenu = document.getElementById('ramen-menu');
// Callbacks
const handleClick = (ramen) => {
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
}

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.elements['new-name'];
    const restaurantInput = form.elements['new-restaurant'];
    const imageInput = form.elements['new-image'];
    const ratingInput = form.elements['new-rating'];
    const commentInput = form.elements['new-comment'];

    const newRamen = {
      name: nameInput.value,
      restaurant: restaurantInput.value,
      image: imageInput.value,
      rating: ratingInput.value,
      comment: commentInput.value
    };

    addNewRamenToMenu(newRamen);
    form.reset();
  })
}

const addNewRamenToMenu = (ramen)  => {
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  img.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(img);
};

const displayRamens = () => {
  fetch(ramenAPI)
    .then(response => response.json())
    .then(data => {
      data.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        ramenMenu.append(img);

        img.addEventListener('click', () => handleClick(ramen));
        
      });
    })
    .catch(error => {
      console.error('Error fetching ramens:', error);
    });
};




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
