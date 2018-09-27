document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false
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
      toyCard.innerHTML = `<h2>${toy.name}</h2><img class='toy-avatar' src ='${toy.image}'><p>${toy.likes}</p><button class='like-btn'>Like</button>`;
      toyContainer.append(toyCard);
    });
  }


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      // let name = document.getElementsByClassName('input-text')[0].value;
      // let image = document.getElementsByClassName('input-text')[1].value;
      // let mainURL = 'http://localhost:3000/toys';
      toyForm.style.display = 'block';
      toyForm.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(mainURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name,
            image: image,
            likes: 0
          })
        }).then(res => res.json()).then(console.log)
      })
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })
});



// OR HERE!
