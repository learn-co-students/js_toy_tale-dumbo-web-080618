class Adapter{
  constructor(baseURL){
    this.baseURL = baseURL
    this.getToys = this.getToys.bind(this)
    this.addToy = this.addToy.bind(this)
  }

  getToys(){
    return fetch(this.baseURL)
    .then(res => res.json())
  }

  addToy(toy){
    // let body = JSON.strin
    return fetch(this.baseURL, {
      method: 'POST',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
  }

  updateLikes(likes, id){
    let myLikes = {likes: likes}
    return fetch(`${this.baseURL}/${id}`, {
      method: 'PATCH',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(myLikes)
    }
    )
  }
}