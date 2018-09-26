const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyContainer = document.querySelector('#toy-collection');


let addToy = false;

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', function(){


  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(resp => resp.forEach(function(toy){
      const card = document.createElement('div');
      card.className ='card';
      card.dataset.id = toy.id;
      const toyName = document.createElement('h2');
      toyName.innerText = toy.name;
      const toyImage = document.createElement('img');
      toyImage.className = 'toy-avatar';
      toyImage.src = toy.image;
      const toyLikes = document.createElement('p');
      toyLikes.innerText = toy.likes;
      const toyLikeButton = document.createElement('button');
      toyLikeButton.className = 'like-btn';
      toyLikeButton.dataset.id = toy.id;
      toyLikeButton.innerText = 'Like';
      toyLikeButton.addEventListener('click', increaseLikes);
      card.append(toyName, toyImage, toyLikes, toyLikeButton);
      toyContainer.append(card);
    }));

    function makeNewToy(response){
      let toy = {};
      toy.name = response.name;
      toy.image = response.image;
      toy.like = response.likes;
      const newCard = document.createElement('div');
      newCard.className = 'card';
      newCard.dataset.id = toy.id;
      const newToyName = document.createElement('h2');
      newToyName.innerText = toy.name;
      const newToyImage = document.createElement('img');
      newToyImage.className = 'toy-avatar';
      newToyImage.src = toy.image;
      const newToyLikes = document.createElement('p');
      newToyLikes.innerText = toy.like;
      const newToyLikeButton = document.createElement('button');
      newToyLikeButton.className = 'like-btn';
      newToyLikeButton.innerText = 'Like';
      newToyLikeButton.dataset.id = toy.id;
      newToyLikeButton.addEventListener('click', increaseLikes);
      newCard.append(newToyName, newToyImage, newToyLikes, newToyLikeButton);
      toyContainer.append(newCard);
      return toy;

    };


    addBtn.addEventListener('click', (event) => {
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'

        let createNewToyButton = document.querySelector('.submit')

        createNewToyButton.addEventListener('click', function(event){
          event.preventDefault();
          let toyName = document.querySelector('#name').value;
          let toyImage = document.querySelector('#image').value;
          let newToyObj = {name: toyName, image: toyImage, likes: 0};
          makeNewToy(newToyObj); //display on the DOM
          postNewToy(newToyObj);
        })
      } else {
        toyForm.style.display = 'none'
      }
    })

    function postNewToy(toyObj){
      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toyObj)
      })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
    };

    function increaseLikes (event){
        let id = event.target.dataset.id;
        let likeDiv = event.target.parentElement;
        let updateInFront = likeDiv.querySelector('p');
        let likeCounter = parseInt(likeDiv.querySelector('p').innerText);
        likeCounter++;
        updateInFront.innerText = likeCounter;
        patchToyLike(id, likeCounter);
  }

    function patchToyLike(id, change){
        fetch(`http://localhost:3000/toys/${id}`, {
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({likes: change})
        })
          .then(resp => resp.json())
          .then(resp => console.log())
    }

});
