// import { example } from './data.js';
// import data from './data/lol/lol.js';
import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';

let pageNumber = 1;         //En que pagina se inicia....en la primera                  
let pageSize = 12;          //Cantidad de elementos que se van a mostrar por pagina    
const pageCont = Math.ceil(data.pokemon.length / pageSize); //contenido de la pagina, se utiliza ceil para aproximar hacia arriba 

const botonSiguiente = document.getElementById("siguiente");
const botonAnterior = document.getElementById("anterior");

function paginate(array, page_size, page_number) {      
    return array.slice((page_number - 1) * page_size, page_number * page_size);  //intervalo del array
}

function crearPokemonCard(pokemon){
    let card = document.createElement("article");
        
    let nombre = document.createElement("h2");
    nombre.innerText = `${pokemon.name}`;
    nombre.setAttribute("class", "pintarTitulo");
    
    
    
    let image = document.createElement("img");
    image.src = `${pokemon.img}`;
    
    
    let id = document.createElement("h3");
    id.innerText = ` ${pokemon.id}`;
    
    let tipo = document.createElement("h3");
    tipo.innerText = `${pokemon.type}`
    
    
    card.appendChild(nombre);
    card.appendChild(image);
    card.appendChild(id);
    card.appendChild(tipo);
    
    card.setAttribute("class", "card");

    return card
}

function mostrarPokemon(){
    let pagination = paginate(data.pokemon,pageSize,pageNumber); //array, elementos por pag, pagina en que inicia 
    pagination.forEach((pokemon) => {
        document.getElementById("pokemones").appendChild(crearPokemonCard(pokemon))
    })
}

function borrarContenido(){
    document.getElementById("pokemones").innerHTML = ""
}

function revisarBotonSiguiente(pagina) {
    if(pagina+1 > pageCont) {
        botonSiguiente.style.display= "none"  
        return false
    } else {
        botonSiguiente.style.display= "block"  
        return true
    }
}

function revisarBotonAtras(pagina){
    if(pagina-1 === 0 ) {
        console.log("if")
        botonAnterior.style.display= "none"
        return false  
    }else {
        console.log("else")
        botonAnterior.style.display= "block" 
        return true
    }
}


function siguientePagina(){
    borrarContenido()
    if(revisarBotonSiguiente(pageNumber)){
        pageNumber ++;
        mostrarPokemon()
    }
}


function paginaAnterior(){
    borrarContenido()
    if(revisarBotonAtras(pageNumber)){
        pageNumber--
        mostrarPokemon()
    }
}

botonSiguiente.addEventListener("click", siguientePagina )
botonAnterior.addEventListener("click", paginaAnterior)

mostrarPokemon();
revisarBotonSiguiente(pageNumber);
revisarBotonAtras(pageNumber);