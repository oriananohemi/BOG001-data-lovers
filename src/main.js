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
    let datoTipo = ['']; 
    let dato = ['']; 

    const card = document.createElement("article");
    const container = document.createElement("div")
    
    const image = document.createElement("img");
    image.src = `${pokemon.img}`;
    image.setAttribute("class", "card__image");


    const nombre = document.createElement("h2");
    nombre.innerText = `${pokemon.name}`;
    nombre.setAttribute("class", "pintarTitulo");
    
    
    const id = document.createElement("h3");
    id.innerText = ` ${pokemon.id}`;
    
    for (let i = 0; i < pokemon.type.length; i++) {
        switch (pokemon.type[i]){            
            case 'Grass':
                datoTipo += 'Yerba  ';
                break;
            case 'Poison':
                datoTipo += 'Veneno  ';
                break;
            case 'Fire':
                datoTipo += 'Fuego  ';
                break
            case 'Flying':
                datoTipo += 'Volador  ';
                break
            case 'Water':
                datoTipo += 'Agua  ';
                break    
            case 'Bug':
                datoTipo += 'Insecto  ';
                break 
            case 'Normal':
                datoTipo += 'Normal  ';
                break   
            case 'Ground':
                datoTipo += 'Tierra  ';
                break 
            case 'Electric':
                datoTipo += 'Electrico  ';
                break 
            case 'Fighting':
                datoTipo += 'Lucha  ';
                break 
            case 'Psychic':
                datoTipo += 'Psiquico  ';
                break 
            case 'Rock':
                datoTipo += 'Roca  ';
                break  
            case 'Ice':
                datoTipo += 'Hielo  ';
                break     
            case 'Ghost':
                datoTipo += 'Fantasma  ';
                break 
            case 'Dragon':
                datoTipo += 'Dragon  ';
                break                    
        }         
    }
    
    const tipo = document.createElement("h3");
    tipo.innerText = `Tipo: ${datoTipo}`;

    for (let i = 0; i < pokemon.weaknesses.length; i++) {
        switch (pokemon.weaknesses[i]){            
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

    const debilidades = document.createElement("h3");    
    debilidades.innerText = `Debilidad: ${dato}`;
    
    container.appendChild(nombre)
    container.appendChild(id);
    container.appendChild(tipo);
    container.appendChild(debilidades);

    container.setAttribute("class", "flex__container")
    container.setAttribute("class", "info__container")


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
