//importaciones de variables
const container_card = document.querySelector(".container_card")
const templates = document.getElementById("container")
const errorBox = document.querySelector(".error_style")
//Llamado a la api 
async function requestAPI(pokemonId) {
  try {
    //Pasando la respuesta a json y recuperandola en data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
      return data
    }  
    catch (error) {
    //Por si sucede algun error
    console.error("Error fetching Pokemon:", error);
    errorBox.innerHTML = `<h2 style="color:#d34b4b">Error displaying Pokémon</h2>
                          <p>Try refreshing the page</p>`
    return null;
  }
}
//para que cargue todo el contenido
document.addEventListener("DOMContentLoaded",()=>{
  show_pokemon();
})
//Muestra 151 pokemons en el contenerdor del mismo
//por alguna razon si no hago esa verificacion de que si tiene 1 o 2 tipos el pokemon
//solo muestra los que tienen dos tipos
function show_pokemon(){
  errorBox.innerHTML ="";
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
//mostrando mas errores
.catch(error =>{
    console.error("Error fetching Pokemon:", error);
    errorBox.innerHTML = `<h2 style="color:#d34b4b">Error displaying Pokémon</h2>
                          <p>Try refreshing the page</p>`
    return null;
  })
}}
//funcion para buscar pokemon
//cabe decir que intente que los buscara en tiempo real osea 
//aunque el nombre no este completo por lo menos ya te este
//apareciendo el pokemon,pero no entendi como hacerlo
function find(id){
  errorBox.innerHTML ="";
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
.catch(error =>{
    console.error("Error fetching Pokemon:", error);
    errorBox.innerHTML = `<h2 style="color:#d34b4b">Error finding Pokémon</h2>
                          <p>Try spelling the name correctly</p>`
    return null;
  })
}
//Esta funcion verifica si el pokemon tiene dos o 1 tipo
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
export {find,show_pokemon};







