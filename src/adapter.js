class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  get(path) {
    return fetch(path).then(res =>
      res.json())
  }

  getToys() {
    return this.get(this.baseURL)
  }

  newToy(data) {
    return fetch(`${this.baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
    location.reload()
  }

  updateLike(id, data) {
    return fetch(`${this.baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify(data)
    }).then(res => res.json())
    location.reload()
  }
}
