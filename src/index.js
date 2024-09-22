// index.js
const ramenAPI = 'http://localhost:3000/ramens';
// Callbacks

const handleClick = (ramen) => {
  const detailImg = document.querySelector('#ramen-detail .detail-image');
  const detailName = document.querySelector('#ramen-detail .name');
  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
}

const addSubmitListener = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newRamen = {
      name: form.elements['name'].value,
      image: form.elements['image'].value
    };

    const ramenMenuDiv = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', (e) => handleClick(newRamen, e));
    ramenMenuDiv.appendChild(img);

    form.reset();
  })
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
    const img = document.querySelector('.detail-image')
    img.src = obj.image;
    img.alt = obj.ramenMenu;
    const ramenName = document.querySelector('.name');
    ramenName.textContent = obj.name;
    const ramenRestaurant = document.querySelector('.restaurant');
    ramenRestaurant.textContent = obj.restaurant;
    const rating = document.querySelector('#rating-display');
    rating.innerText = obj.rating;
    const comment = document.querySelector('#comment-display');
    comment.innerText = obj.comment;
  })
}


const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    const ramenForm = document.getElementById('new-ramen');
    addSubmitListener(ramenForm);
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
