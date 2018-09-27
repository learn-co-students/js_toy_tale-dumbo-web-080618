document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  let addToy = false;
  let mainURL = 'http://localhost:3000/toys';

  fetchAllToys();

  function fetchAllToys() {
    fetch(mainURL).then(res => res.json()).then(renderToys);
  }

  function renderToys(toysArray) {
    let toyContainer = document.querySelector('#toy-collection');
    toysArray.forEach(toy => {
      let toyCard = document.createElement('div');
      toyCard.className = 'card';
      toyCard.innerHTML = `<h2>${toy.name}</h2><img class='toy-avatar' src ='${toy.image}'><p>${toy.likes} likes</p><button class='like-btn' data-id='${toy.id}'>Like</button>`;
      toyContainer.append(toyCard);
    });
    toyContainer.addEventListener('click', countLikes);
  }

  function countLikes(e) {
    // debugger;
    let currentLikes;
    let id;
    if (e.target.className === 'like-btn') {
      currentLikes = parseInt(e.target.parentNode.childNodes[2].innerText) + 1;
      e.target.parentNode.childNodes[2].innerText = `${currentLikes} likes`;
      id = e.target.dataset.id
    }
    incrementLikes(id, currentLikes)
  }

  function incrementLikes(id, currentLikes) {
    const individualURL = 'http://localhost:3000/toys' + `/${id}`
    fetch(individualURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: currentLikes
      })
    }).then(res => res.json());
  }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      // let name = document.getElementsByClassName('input-text')[0].value;
      // let image = document.getElementsByClassName('input-text')[1].value;
      // let mainURL = 'http://localhost:3000/toys';
      toyForm.style.display = 'block';
      const submitButton = document.querySelector('.submit');
      submitButton.addEventListener('click', handleAddToy);

      // submit listener here
    } else {
      toyForm.style.display = 'none';
    }
  });

  function handleAddToy(e) {
    // e.preventDefault();
    let data = {
      name: `${document.getElementsByClassName('input-text')[0].value}`,
      image: `${document.getElementsByClassName('input-text')[1].value}`,
      likes: 0,
    };
    postFetch(data);
  }

  function postFetch(data) {
    fetch(mainURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data)
    });
  }
});
