class Adapter{
  constructor(baseURL){
    this.baseURL = baseURL
  }

  get(path){
    return fetch(path).then(res => res.json())
  }

  getToys(){
    return this.get(this.baseURL);
  }

  getToy(id){
    const url = this.baseURL + `/${id}`
    return this.get(url)
  }

  post(path, data){
    return fetch(path, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSO
  }

  postToy(data){
    return this.post(this.baseURL, data)
  }

  patchToy(id, data){
    // let toy = getToy(id);
    let url = this.baseURL + `/${id}`
    // debugger
    // toy.likes = ++toy.likes;
    return fetch(url, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        cache: "reload",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSO
  }
}
