const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const URL = "http://localhost:3000/toys"
const adapter = new Adapter(URL)

document.addEventListener("DOMContentLoaded", () => {
  adapter.getToys()
  .then((toys) => {
    toys.forEach(function(toy) {
      Toys.appendToy(toy)
    })
  })

  document.addEventListener('click', (x) => {
     if (x.target.className === "like-btn") {
       let toyId = x.target.parentNode.parentNode.id
       likes = parseInt(x.target.parentNode.parentNode.querySelector("p").innerText) + 1
       console.log(likes)
       let data = {"likes": likes}
       adapter.addLikes(toyId, data)
     }
  })


})

addBtn.addEventListener('click', () => {

  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    let createToyButton = document.querySelector(".add-toy-form").querySelector("input[type='submit']")
    createToyButton.addEventListener("click", (e)=>{
      e.preventDefault()
      let newToy = Toys.createToy()
        adapter.createToy(newToy)

      toyForm.style.display = 'none'
    })
  } else {
    toyForm.style.display = 'none'
  }




})
