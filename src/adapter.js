class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path) {
    return fetch(path).then(res => res.json());
  }

  getToys() {
    return this.get(this.baseURL);
  }

  getOneToy(id){
    return this.get(`${this.baseURL}/${id}`)
  }

  postToy(data){
    return fetch(this.baseURL, {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  likeToy(id, number){
    return fetch(`${this.baseURL}/${id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({"likes": number})
    }).then(res => res.json())
  }

}
