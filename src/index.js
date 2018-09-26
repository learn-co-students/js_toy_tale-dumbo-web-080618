

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const createBtn = document.querySelector('.add-toy-form input[type=submit]')
  const URL = "http://localhost:3000/toys"
  let addToy = false



  let adapter = new Adapter(URL)
  adapter.getToys().then(toys => {
    toys.forEach(function(toy){
      let toyObj = new Toy(toy)
      toyObj.renderCard();
      let likeBtn = document.querySelector(`#toy-${toyObj.id}`)
      // document.getElementsByClassName("like-btn")
      // debugger
      likeBtn.addEventListener( 'click', (e) => {
        let id = parseInt(e.target.id.slice(4));
        adapter.getToy(id).then(toy => {
          toy.likes++
          adapter.patchToy(id, toy).then(res => {
            window.location.reload();
          })
        })

      })
    })
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



  createBtn.addEventListener('click', () => {
    let inputToyName = document.querySelector('.add-toy-form input[name=name]').value
    let inputToyImg = document.querySelector('.add-toy-form input[name=image]').value
    let toy = { name: inputToyName, image: inputToyImg, likes: 0}
    let json = adapter.postToy(toy)

  })


})



// OR HERE!
