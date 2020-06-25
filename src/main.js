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
      
    let dato = ['']; 
    function tipoDebilidad (data){
        for (let i = 0; i < data.length; i++) {
            switch (data[i]){            
                case 'Grass':
                    dato += 'Yerba  ';
                    break;
                case 'Poison':
                    dato += 'Veneno  ';
                    break;
                case 'Fire':
                    dato += 'Fuego  ';
                    break
                case 'Flying':
                    dato += 'Volador  ';
                    break
                case 'Water':
                    dato += 'Agua  ';
                    break    
                case 'Bug':
                    dato += 'Insecto  ';
                    break 
                case 'Normal':
                    dato += 'Normal  ';
                    break   
                case 'Ground':
                    dato += 'Tierra  ';
                    break 
                case 'Electric':
                    dato += 'Electrico  ';
                    break 
                case 'Fighting':
                    dato += 'Lucha  ';
                    break 
                case 'Psychic':
                    dato += 'Psiquico  ';
                    break 
                case 'Rock':
                dato += 'Roca  ';
                    break  
                case 'Ice':
                dato += 'Hielo  ';
                    break     
                case 'Ghost':
                    dato += 'Fantasma  ';
                    break 
                case 'Dragon':
                    dato += 'Dragon  ';
                    break                    
            }         
        }
    return dato
    }

    //tipoDebilidad(pokemon.weaknesses)
    tipoDebilidad(pokemon.type)
    let tipo = document.createElement("h4");
    tipo.innerText = `Tipo: ${dato}`;
    console.log(dato)

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
    if(pagina + 1 > pageCont) {
        botonSiguiente.style.display= "none"  
        return false
    } else {
        botonSiguiente.style.display= "block"  
        return true
    }
}

function revisarBotonAtras(pagina){
    if(pagina != 1) {
        //console.log("if")
        botonAnterior.style.display= "block" 
        return true
    } else {
        botonAnterior.style.display= "none"
        return false 
        //console.log("else")
    }
}


function siguientePagina(){
    borrarContenido()
    if(revisarBotonSiguiente(pageNumber)){
        pageNumber ++;
        mostrarPokemon()
        console.log(pageNumber)
    }
}


function paginaAnterior(){
    borrarContenido()
    if(revisarBotonAtras(pageNumber)){
        pageNumber --;
        mostrarPokemon()
        console.log(pageNumber)
    }
    
}

botonSiguiente.addEventListener("click", siguientePagina )
botonAnterior.addEventListener("click", paginaAnterior)

mostrarPokemon();
revisarBotonSiguiente(pageNumber);
revisarBotonAtras(pageNumber);

