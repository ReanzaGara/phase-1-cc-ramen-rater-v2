// index.js

// Callbacks
const handleClick = (ramen) => {
  document.getElementById('ramen-name').textContent = ramen.name;
  document.getElementById('ramen-img').src = ramen.image;
  document.getElementById('ramen-rating').textContent = `Rating: ${ramen.rating}`;
  document.getElementById('ramen-comment').textContent = `Comment: ${ramen.comment}`;
}

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', ramen => {
    ramen.preventDefault();

    const newRamen = {
      name: form.name.value,
      image: form.image.value,
      rating: form.rating.value,
      comment: form.comment.value
    };

    addNewRamenToMenu(newRamen);

    form.reset();
  });
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      
      ramenMenuDiv.innerHTML = '';

      data.forEach(ramen => {
        
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
