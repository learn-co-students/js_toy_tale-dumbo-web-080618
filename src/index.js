const URL = 'http://localhost:3000/toys';

document.addEventListener('DOMContentLoaded', () => {
  const adapter = new Adapter(URL);
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const form = document.querySelector('.add-toy-form');

  loadToys();

  function loadToys() {
    adapter.getToys()
    .then(data => {
      data.forEach(toy => {
        const getToy = new Toy(toy, adapter);
        getToy.renderToys();
      })
    })
  }


  let addToy = false
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // let name = document.querySelector('.add-toy-form')[0];
    // let image = document.querySelector('.add-toy-form')[1];
    let name = e.target.name //get input[0];
    let image = e.target.image //get input[1];
    // let data = {};
    // data.name = name.value;
    // data.image = image.value;
    // data.likes = 0;
    let data = {
      "name": name.value,
      "image": image.value,
      "likes": 0
    }
    const getToy = new Toy(data);
    adapter.postToy(data)
    .then(res => loadToys()) //or window.location.reload();
    name.value = "";
    image.value = "";
  })



})
