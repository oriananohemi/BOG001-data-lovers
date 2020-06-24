import data from './data/pokemon/pokemon.js';

const datosPokemon = data.pokemon
const containerPokemones = document.getElementById("pokemones")
const botonSiguiente = document.getElementById("siguiente");
const botonAnterior = document.getElementById("anterior");

const pokemonesPorPagina = 12;
const separacionPaginas = Math.ceil(datosPokemon.length / pokemonesPorPagina);

let paginaInicial = 1;               


function paginate(array, page_size, page_number) {      
    return array.slice((page_number - 1) * page_size, page_number * page_size);  //intervalo del array
}

function crearPokemonCard(pokemon){
    
    const card = document.createElement("article");
    const container = document.createElement("div")
    
    const nombre = document.createElement("h2");
    nombre.innerText = `${pokemon.name}`;
    nombre.setAttribute("class", "pintarTitulo");
    
    
    const image = document.createElement("img");
    image.src = `${pokemon.img}`;
    
    
    const id = document.createElement("h3");
    id.innerText = ` ${pokemon.id}`;
    

    const tipo = document.createElement("h3");
    tipo.innerText = `${pokemon.type}`
    

    container.appendChild(tipo);
    container.appendChild(id);

    container.setAttribute("class", "flex__container")

    
    card.appendChild(nombre);
    card.appendChild(image);
    card.appendChild(container);
    
    card.setAttribute("class", "card");

    return card
}

function mostrarPokemon(){
    let pagination = paginate(datosPokemon,pokemonesPorPagina,paginaInicial);
    pagination.forEach((pokemon) => {
        containerPokemones.appendChild(crearPokemonCard(pokemon))
    })
}

function borrarContenido(){
    containerPokemones.innerHTML = ""
}

function revisarBotonSiguiente(pagina) {
    if(pagina+1 > separacionPaginas) {
        botonSiguiente.style.display= "none"  
    } else {
        botonSiguiente.style.display= "block"  
    }
}

function revisarBotonAtras(pagina){
    if(pagina-1 === 0 ) {
        botonAnterior.style.display= "none"
    }else {
        botonAnterior.style.display= "block" 
    }
}

function cambiarPagina(event){
    borrarContenido()
    if(event.target.id === "siguiente"){
        paginaInicial ++;
    } else {
    paginaInicial--
    }
    mostrarPokemon()
    revisarBotonAtras(paginaInicial);
    revisarBotonSiguiente(paginaInicial);
}

// function siguientePagina(){
//     borrarContenido()
//     paginaInicial ++;
//     mostrarPokemon()
//     revisarBotonSiguiente(paginaInicial);
//     revisarBotonAtras(paginaInicial);
// }


// function paginaAnterior(){
//     borrarContenido()
//     paginaInicial--
//     mostrarPokemon()
//     revisarBotonSiguiente(paginaInicial);
//     revisarBotonAtras(paginaInicial);    
// }

botonSiguiente.addEventListener("click", cambiarPagina)
botonAnterior.addEventListener("click", cambiarPagina)

mostrarPokemon();
revisarBotonAtras(paginaInicial);
revisarBotonSiguiente(paginaInicial);