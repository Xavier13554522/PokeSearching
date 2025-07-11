//importaciones de apis y elementos del DOM
import {find,show_pokemon} from "./api.js"
const text = document.getElementById("input_text")
const input_search = document.getElementById("input_search")
input_search.addEventListener("click",findPokemon)
//si no hay nada en el inputText muestra los pokemons
text.addEventListener("input",()=>
    {
        const input_text = text.value;
        if (input_text === ""){
            show_pokemon();
        }
    })
//busca el pokemon
function findPokemon(){
    const input_text = text.value;
    find(input_text);
    if (input_text === ""){
        show_pokemon();
    }
}
