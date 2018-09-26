class Toys {
  constructor(name, image, likes=0) {
    this.name = name
    this.image = image
    this.likes = likes
  }

  static toyDiv(toy) {
    let div = document.createElement("div")
    div.className ="card"
    div.innerHTML =`<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar"><p>${toy.likes} Likes <p><button class="like-btn">Like <3</button>`
    div.id = toy.id
  return div
  }

  static appendToy(toy) {
    let toyDiv = this.toyDiv(toy)
    let toyContainer = document.querySelector("#toy-collection")
    toyContainer.append(toyDiv)
  }

  static createToy() {
    let toyForm = document.querySelector(".add-toy-form")
    let toyName = toyForm.querySelector("input[name='name']").value
    let toyImage = toyForm.querySelector("input[name='image']").value
    let newToy = new Toys(toyName, toyImage)
    return newToy
  }



}
