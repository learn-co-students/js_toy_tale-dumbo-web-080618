const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector('#toy-collection');

let addToy = false;

document.addEventListener("DOMContentLoaded", function(){
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(resp => resp.forEach(function(toy){
      makeCard(toy);
    }))
    .then(resp => console.log(resp))

  function makeCard (response){
    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = response.id;
    let toyName = document.createElement('h2');
    toyName.innerText = response.name;
    let toyImage = document.createElement('img');
    toyImage.src = response.image;
    toyImage.className = 'toy-avatar';
    let toyLikes = document.createElement('p');
    toyLikes.innerText = response.likes;
    let toyLikeButton = document.createElement('button');
    toyLikeButton.className = 'like-btn';
    toyLikeButton.innerText = 'Like';
    toyLikeButton.dataset.id = response.id;
    toyLikeButton.addEventListener('click', patchLikeCount);
    card.append(toyName, toyImage, toyLikes, toyLikeButton);
    toyCollection.append(card);
  }

  function patchLikeCount(event){
    let id = event.target.dataset.id;
    let cardDiv = event.target.parentElement;
    let likesFrontEnd = cardDiv.querySelector('p');
    let changeInBackEnd = parseInt(cardDiv.querySelector('p').innerText);
    changeInBackEnd++;
    likesFrontEnd.innerText = changeInBackEnd;
    patchToyLikes(id, {likes: changeInBackEnd});
  }

  addBtn.addEventListener('click', (event) => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block';

      let submitButton = document.querySelector('#submit');
      submitButton.addEventListener('click', function(event){
        event.preventDefault();
        let toyName = document.querySelector('#name').value;
        let toyImage = document.querySelector('#image').value;
        let newToy = {name: toyName, image: toyImage, likes: 0};
        makeCard(newToy); //will post on the front end
        postNewToy(newToy); //will post on the back end
      })

    } else {
      toyForm.style.display = 'none'
    }
  })

  function postNewToy(newToy){
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {  //be extremely careful go to the documentation and just copy and paste this part
        'Accept': "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }

  function patchToyLikes(id, change){
    fetch(`http://localhost:3000/toys/${id}`,{
      method: "PATCH",
      headers: {  //be extremely careful go to the documentation and just copy and paste this part
        'Accept': "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(change)
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }

});
