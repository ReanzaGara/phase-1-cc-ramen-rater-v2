// index.js

// Callbacks
const handleClick = (ramen) => {
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = `Rating: ${ramen.rating}`;
  document.getElementById('comment-display').textContent = `Comment: ${ramen.comment}`;
}

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', ramen => {
    ramen.preventDefault();

    const newRamen = {
      name: form.name.value,
      restaurant: form.restaurant.value,
      image: form.image.value,
      rating: form['new-ramen-rating'].value,
      comment: form['new-ramen-comment'].value
    };

    addNewRamenToMenu(newRamen);

    form.reset();
  });
}

const addNewRamenToMenu(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  img.addEventListener('click', () => handleClick(ramen));

  ramenMenu.appendChild(img);
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(data => {
    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = '';

    data.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
    })
  })
  .catch(error => console.log('Error fetching ramens:', error));
}


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
