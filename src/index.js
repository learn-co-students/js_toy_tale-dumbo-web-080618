const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const URL = 'http://localhost:3000/toys'

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", () => {
  const adapter = new Adapter(URL)
  adapter.getToys()
    .then((toyList) => {
      toyList.forEach(toy => {
        const toyObj = new Toy(toy)
        toyObj.renderToys()
      })
    })
})

addBtn.addEventListener('click', () => {
  const form = document.querySelector(".add-toy-form")
  const submit = form.querySelector(".submit")
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // console.log(submit)
    submit.addEventListener('click', () => {
      const name = document.querySelectorAll(".input-text")[0]
      const img = document.querySelectorAll(".input-text")[1]
      const newAdapt = new Adapter(URL)
      newAdapt.newToy({
        "name": name.value,
        "image": img.value,
        "likes": 0
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})
