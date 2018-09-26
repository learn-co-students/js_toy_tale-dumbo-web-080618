class Toy{
  constructor(toy, adapter){
    this.id = toy.id
    this.name = toy.name
    this.image = toy.image 
    this.likes = toy.likes
    this.adapter = adapter
    this.getToyCard = this.getToyCard.bind(this)
  }

  getToyCard(){
    const toyCard = document.createElement('div')
    toyCard.classList.add('card')
    toyCard.innerHTML = `<h2>${this.name}</h2><img src="${this.image}" class="toy-avatar"/><p>${this.likes} Likes </p>`
    const button = document.createElement('button')
    button.classList.add('like-btn')
    button.innerText = 'Like <3'
    button.addEventListener('click', () => this.moreLikes())
    toyCard.appendChild(button)
    return toyCard
  }

  moreLikes(){
    this.likes += 1
    this.adapter.updateLikes(this.likes, this.id)
    this.getToyCard()    
  }
}