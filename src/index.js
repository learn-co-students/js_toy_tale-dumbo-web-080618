const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToy = document.querySelector('.submit')
const toyCol = document.querySelector('#toy-collection')
const URL = 'http://localhost:3000/toys'
let addToy = false


// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', function(){
  getIndex();
})

newToy.addEventListener('click', a => {
  a.preventDefault()
  let b = document.querySelector('#name')
  let c = document.querySelector('#image')
  post(b.value, c.value).then(res =>{
    appendToy(res)
  })
  // window.location.reload()
  b.value = ""
  c.value = ""
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

function getIndex(){
  toyCol.innerHTML = ""
  fetch(URL).then(res => res.json())
    .then(res => res.forEach(function(toy){
      appendToy(toy)
    }))
}

function appendToy(toy){
  let card = document.createElement('div')
  card.className += " card"
  let card_dis = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar">
  <p>${toy.likes} Likes <p>
  <button class="like-btn">Like <3</button>`
  card.innerHTML = card_dis
  toyCol.append(card)

  let toyLike = card.querySelector('.like-btn')
  toyLike.addEventListener('click', function(){
    let a = card.querySelector('p')
    let num = parseInt(a.innerText)

    patch(`${URL}/${toy.id}`, num + 1)
      .then(res => {
        a.innerHTML = `${res.likes} Likes `
      })
    // window.location.reload()
  })
}

function post(name, image){
  return fetch(URL,{
    method:'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(data(name, image)),

  }).then(response => response.json())
}

function patch(path, like){
  return fetch(path,{
    method:'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(data1(like)),

  }).then(response => response.json())
}

function data1(like){
  return {
    "likes": like
  }
}

function data(name, image){
  return {
    "name": name,
    "image": image,
    "likes": 0
  }
}
