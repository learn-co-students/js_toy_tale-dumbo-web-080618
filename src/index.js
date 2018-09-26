// YOUR CODE HERE
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  const toyURL = 'http://localhost:3000/toys/'
  const toyCollectionContainer = document.querySelector("#toy-collection")

  function fetchAllToys(){
  fetch(toyURL)
  .then(res => res.json())
  .then(renderAllToys)
  // .then(res => renderAllToys(json[0]))
  }
  fetchAllToys()

  function renderAllToys(arr){
    arr.forEach(toy => {
      // console.log(toy);
    toyCollection.append(createToyDiv(toy)) //have to return in the createToyDiv

    })
  }

  function createToyDiv(toy){
    //console.log(toy.id);
    let toy_div = document.createElement('div')
    toy_div.setAttribute('data-id', toy.id)
    toy_div.setAttribute('class', "card")

    //console.log(toy_div);

    const display = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p>${toy.likes} Likes </p>`

    const like_button = document.createElement('button')
    like_button.innerText = 'Like<3'
    //create addEventListener
    like_button.addEventListener('click', (event) => {
      let parent = event.target.parentNode  //look at the div
      const id = parent.getAttribute('data-id')
      let like_add = parent.querySelector('p')
      //console.log(parseInt(like_add.innerText));

      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH', // or 'PUT'
        body: JSON.stringify({
          likes: parseInt(like_add.innerText) + 1
        }), // data can be `string` or {object}!
        headers:{ 'Content-Type': 'application/json'}
      })
     .then(res => res.json())
     .then(num_backend => like_add.innerText = `${num_backend.likes} Likes`)
  })
  like_button.classList.add('like-btn') // manually adds in a class to the button
  toy_div.innerHTML = display //parent to child
  toy_div.append(like_button)


  return toy_div //always explicitly return to display below
  }
  addBtn.addEventListener('click', () => {
    const submit = document.querySelector(".submit")
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // const create_bar = document.querySelector(".")
      submit.addEventListener('click', handleAddToy)
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })
  function handleAddToy(){
    let post = { //w/e user posts make obj with key value pairs
      name: document.querySelectorAll(".input-text")[0].value,
      image: document.querySelectorAll(".input-text")[1].value,
      likes: 0
    }
    postNewToy(post)

  }
  function postNewToy(post){
    fetch(toyURL, {
      method: 'POST',
      headers: {
           "Content-Type": "application/json"
      },
      body: JSON.stringify(post) //my data is post
    })

  }


})


// OR HERE!
// function createToyDiv(){
//   let new_div = createElement('div')
//   new_div.setAttribute(class, )
// }
