class Toy{
  constructor(toy){
    this.id = toy.id
    this.name = toy.name
    this.image = toy.image
    this.likes = toy.likes
  }

  renderCard(){
    // find div to contain cards
    let toyContainer = document.querySelector("#toy-collection")
    // create element
    let toyCard = document.createElement('div')
    toyCard.className = "card";
    let info = `
      <h2>${this.name}</h2>
      <img src=${this.image} class="toy-avatar">
      <p>${this.likes} Likes <p>
      <button class="like-btn" id="toy-${this.id}">Like <3</button>
    `
    // append info
    toyCard.innerHTML = (info)
    // append to div
    toyContainer.appendChild(toyCard)

  }
}
