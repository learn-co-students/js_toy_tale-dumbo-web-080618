class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  get(path) {
    return fetch(path).then(res => (res.json()))
  }

  getToys() {
    return this.get(this.baseURL)
  }

  createToy(data) {
    fetch((this.baseURL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      Accept: "application/json"
    },
      body: JSON.stringify(data)
    }).then(res => res.json()).then((toy) => console.log(toy))
    location.reload();
  }

  addLikes(id, data) {
    // debugger
    fetch((this.baseURL+"/"+id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      Accept: "application/json"
    },
      body: JSON.stringify(data)
    })
    location.reload();
  }


}
