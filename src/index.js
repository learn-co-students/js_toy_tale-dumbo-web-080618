const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyBin = document.querySelector('#toy-collection')
const baseURL = 'http://localhost:3000/toys'
const adapter = new Adapter(baseURL)
let addToy = false

document.addEventListener('DOMContentLoaded', function(){


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

  toyForm.addEventListener('submit', (e) => {
    // alert('submitted')
    e.preventDefault()
    const toyNameForm = document.querySelectorAll('.input-text')
    let newToy = {name: `${toyNameForm[0].value}`, image: `${toyNameForm[1].value}`, likes: 0, id: null}
    toyNameForm[0].value = ""
    toyNameForm[1].value = ""
    const madeToy = new Toy(newToy, adapter)
    // console.log(madeToy)
    adapter.addToy(madeToy)

  })

  adapter
      .getToys()
      .then(res => {
        res.forEach(toy => {
          const omotcha = new Toy(toy, adapter)
          toyBin.append(omotcha.getToyCard())
        })
      })
})

