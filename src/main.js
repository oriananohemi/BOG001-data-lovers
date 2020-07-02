import data from './data/pokemon/pokemon.js';
// import filtrar from './data';

const datosPokemon = data.pokemon
const containerPokemones = document.getElementById("pokemones")
const botonSiguiente = document.getElementById("siguiente");
const botonAnterior = document.getElementById("anterior");
const menuHamburguesa = document.getElementById("menuTrigger");
const modal = document.getElementById("modal");
const main = document.getElementById("contenedorTodaData");
const infoPokemon = document.getElementsByClassName("modal__pokemon__info")[0];
const botonCerrarModal = document.getElementById("cerrar");
const links = document.querySelectorAll(".header__link");

const pokemonesPorPagina = 12;
const separacionPaginas = Math.ceil(datosPokemon.length / pokemonesPorPagina);

let paginaInicial = 1;  

function agregarEscuchador(){
    links.forEach(link => link.addEventListener("click", cambiarVista) )
}

agregarEscuchador()

function cambiarVista(evento){
    
    document.querySelectorAll(".paginas").forEach(pagina => pagina.classList.add("hidden"))
    
    let linkActivo = document.querySelector(".header__link__active")
    
    linkActivo.classList.remove("header__link__active")

    const enlace = evento.target

    console.log(enlace)
    
    enlace.classList.add("header__link__active")
    
    const pagina = enlace.getAttribute("href").slice(1);
    
    document.getElementById(pagina).classList.remove("hidden")
}

function paginate(array, page_size, page_number) {      
    return array.slice((page_number - 1) * page_size, page_number * page_size);  //intervalo del array
}

function crearPokemonCard(pokemon){
    let datoTipo = ['']; 
    let dato = ['']; 

    const card = document.createElement("article");
    const container = document.createElement("div")
    // NOMBRE DE CLASE
    const containerTitulo = document.createElement("div")

    const image = document.createElement("img");
    image.src = `${pokemon.img}`;
    image.setAttribute("class", "card__image");


    const nombre = document.createElement("h2");
    nombre.innerHTML = `${pokemon.name}`;
    nombre.setAttribute("class", "pintarTitulo");
    
    
    const id = document.createElement("h3");
    id.innerHTML = ` ${pokemon.id}`;
    
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
    tipo.innerHTML = `Tipo: ${datoTipo}`

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
    debilidades.innerHTML = `Debilidad: ${dato}`;
    
    containerTitulo.appendChild(nombre)
    containerTitulo.appendChild(id);
    containerTitulo.setAttribute("class", "container__flex")

    container.appendChild(containerTitulo);
    container.appendChild(tipo);
    container.appendChild(debilidades);

    container.setAttribute("class", "card__info")


    card.appendChild(image);
    card.appendChild(container);
    
    card.setAttribute("class", "card__container");

    card.addEventListener("click", () => abrirModal(pokemon))
    
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
    window.scrollTo(0, 0)
    borrarContenido();    
    if(event.target.id === "siguiente"){
        paginaInicial ++;
    } else {
        paginaInicial--
    }
    
    mostrarPokemon()
    revisarBotonAtras(paginaInicial);
    revisarBotonSiguiente(paginaInicial);
}

function abrirMenu() {
    document.getElementById("menu").classList.toggle("header__menu__position")
}

function abrirModal(pokemon){
    modal.classList.remove("hidden")
    main.classList.add("hidden")
    pintarPokemonEnModal(pokemon)
}

function cerrarModal(){
    modal.classList.add("hidden")
    main.classList.remove("hidden")
}

function pintarPokemonEnModal(pokemon){
    window.scrollTo(0, 0);
    let datoTipo = ['']; 
    let dato = ['']; 

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
                datoTipo += "./image/vector_electrico.png";
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
    
    infoPokemon.innerHTML = 
    `<div>
        <img class = "modal__img" src = "./image/pngflow.png" >
        <img class = "modal__image-pokemon" src = "${pokemon.img}">
    </div>
    <h2>${pokemon.name} ID. ${pokemon.id}</h2>
    <div class = "modal__features">
        <div>
            <p>Altura: <span> ${pokemon.height} </span></p>
            <p>Peso: <span> ${pokemon.weight} </span></p>
            <p>Caramelo: <span> ${pokemon.candy} </span></p>
            <p>Recuento de Caramelos: <span> ${pokemon.candy_count} </span></p>
        </div>
        <div class = "modal__type">
            <p>Tipo: ${datoTipo} </p>
            <p>Debilidad: ${dato}</p>
        </div>
    </div>`   
}

botonSiguiente.addEventListener("click", cambiarPagina)
botonAnterior.addEventListener("click", cambiarPagina)
menuHamburguesa.addEventListener("click", abrirMenu)
botonCerrarModal.addEventListener("click", cerrarModal)

mostrarPokemon();
revisarBotonAtras(paginaInicial);
revisarBotonSiguiente(paginaInicial);
