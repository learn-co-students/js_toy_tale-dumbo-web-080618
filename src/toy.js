class Toy {
  constructor(toy) {
    this.name = toy.name
    this.image = toy.image
    this.likes = toy.likes
    this.id = toy.id
  }


  renderToys() {
    const collection = document.querySelector("#toy-collection")
    const div = document.createElement("div")
    div.className = 'card'
    div.innerHTML =
    `<h2>${this.name}</h2>
    <img src=${this.image} class="toy-avatar">
    <p>${this.likes}</p>
    <button class="like-btn">like!</button>`
    div.id = this.id
    collection.append(div)
    let button = div.querySelector('button')
    button.addEventListener('click', () => {
      this.likeCount(button)
      const adapt = new Adapter(URL)
      let newNum = ++this.likes
      adapt.updateLike(div.id, {
        "likes": `${newNum}`
      })
    })
  }

  likeCount(button) {
    const card = button.parentNode
    const likes = card.querySelector("p")
    let num = parseInt(likes.innerText)
    num++
    likes.innerText = num
  }
}
