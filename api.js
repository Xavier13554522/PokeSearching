const container_card = document.querySelector(".container_card")
const templates = document.getElementById("container")
async function requestAPI(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
      return data

  }catch (error) {
    console.error("Error fetching Pokemon:", error);
    return null;
  }
}
document.addEventListener("DOMContentLoaded",()=>{
  show_pokemon();
})
function show_pokemon(){
templates.innerHTML = ""

for(let i = 1;i<=151;i++){
requestAPI(i).then(data =>{
  let have = verify(data.types)
  if(have === true){
    templates.innerHTML += 
  `<div class="card">
      <img src="${data.sprites.front_default}"alt=""class="img_style">
      <h2 class = "name_style">${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}</h2>
      <div class="type_flex">
      <p class="${data.types[0].type.name}_style">${data.types[0].type.name}</p>
      <p class="${data.types[1].type.name}_style">${data.types[1].type.name}</p>
      </div>
      </div>`
  }
  else if(have === false){
    templates.innerHTML += 
    `<div class="card">
        <img src="${data.sprites.front_default}"alt=""class="img_style">
        <h2 class = "name_style">${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}</h2>
        <p class="${data.types[0].type.name}_style">${data.types[0].type.name}</p>
        </div>`
  }
}
)
}}
function find(id){
  id = String(id).toLowerCase();
  requestAPI(id).then(data =>{
    templates.innerHTML = 
    `<div class="card">
    <img src="${data.sprites.front_default}"alt=""class="img_style">
    <h2 class = "name_style">${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}</h2>
    <p class="${data.types[0].type.name}_style">${data.types[0].type.name}</p>
    </div>`
  }
)
}
function verify(arr){
  let count = 0;
  for (const idx in arr) {
    count++;
  }
  if(count === 2){
    return true
  }
  else if(count === 1){
    return false
  }
}
export { find,show_pokemon};







