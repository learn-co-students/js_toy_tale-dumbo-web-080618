class Toy {
  constructor(toy, adapter) {
    this.id = toy.id;
    this.name = toy.name;
    this.image = toy.image;
    this.likes = toy.likes;
    this.adapter = adapter;
  }

  toyContainer() {
    const div = document.createElement('div');
    div.innerHTML = `
    <h2>${this.name}</h2>
    <img src=${this.image} class="toy-avatar">
    <p>${this.likes} Likes <p>
    <button class="like-btn">Like <3</button>`
    
    const likeBtn = div.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => {
      this.renderLikes();
      let p = div.querySelector('p');
      p.innerText = `${this.likes} Likes`
      return p;
    })
    div.classList.add('card');
    return div;
  }

  renderLikes() {
    this.likes++;
    this.adapter.likeToy(this.id, this.likes)
    .then(res => this.toyContainer())
  }

  renderToys() {
    const collection = document.querySelector('#toy-collection');
    collection.append(this.toyContainer());
  }


}
