import data from './data/pokemon/pokemon.js';
import funciones from './data.js';

const datosPokemon = data.pokemon
const copydata = datosPokemon.slice()
const datosOrdenados = funciones.dataSort(copydata)

const containerPokemones = document.getElementById("pokemones")
const containerPokemonesOrdenados = document.getElementById("pokemonesOrdenados")

const botonSiguiente = document.getElementById("siguiente");
const botonAnterior = document.getElementById("anterior");
const menuHamburguesa = document.getElementById("menuTrigger");


const modal = document.getElementById("modal");
const main = document.getElementById("contenedorTodaData");


const infoPokemon = document.getElementsByClassName("modal__pokemon__info")[0];
const botonCerrarModal = document.getElementById("cerrar");
const links = document.querySelectorAll(".header__link");
const selectFiltrar = document.getElementById('buscar__type');
let pruebaFiltro = document.getElementById('pruebaFiltro');

const pokemonesPorPagina = 12;
const separacionPaginas = Math.ceil(datosPokemon.length / pokemonesPorPagina);

let paginaInicial = 1;  
let datosFiltradosPokemon = datosPokemon;

function agregarEscuchador(){
    links.forEach(link => link.addEventListener("click", cambiarVista) )
}

agregarEscuchador()

function cambiarVista(evento){
    
    document.querySelectorAll(".paginas").forEach(pagina => pagina.classList.add("hidden"))
    
    let linkActivo = document.querySelector(".header__link__active")
    
    linkActivo.classList.remove("header__link__active")

    const enlace = evento.target

        
    enlace.classList.add("header__link__active")
    
    const pagina = enlace.getAttribute("href").slice(1);
    
    document.getElementById(pagina).classList.remove("hidden")

    mostrarPokemon(pagina)
}

function paginate(array, page_size, page_number) {      
    return array.slice((page_number - 1) * page_size, page_number * page_size);  //intervalo del array
}

function crearPokemonCard(pokemon){
    
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
       
    const tipo = document.createElement("h3");
    tipo.innerHTML = `Tipo: ${pokemon.type}`

    const debilidades = document.createElement("h3");
    debilidades.innerHTML = `Debilidad: ${pokemon.weaknesses}`;
    
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

function mostrarPokemon(pagina){
    let datosAPintar;
    let contenedorPokemones; 

    if(pagina === 'ordenar') {
        datosAPintar = datosOrdenados;
        contenedorPokemones = containerPokemonesOrdenados;
    } else {
        datosAPintar = datosPokemon;
        contenedorPokemones = containerPokemones;
    }
    let pagination = paginate(datosAPintar,pokemonesPorPagina,paginaInicial);
    pagination.forEach((pokemon) => {
        contenedorPokemones.appendChild(crearPokemonCard(pokemon))
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
            <p>Tipo: ${pokemon.type} </p>
            <p>Debilidad: ${pokemon.weaknesses}</p>
        </div>
    </div>`   
}

botonSiguiente.addEventListener("click", cambiarPagina)
botonAnterior.addEventListener("click", cambiarPagina)
menuHamburguesa.addEventListener("click", abrirMenu)
botonCerrarModal.addEventListener("click", cerrarModal)
selectFiltrar.addEventListener('change', filtrarTipo)

revisarBotonAtras(paginaInicial);
revisarBotonSiguiente(paginaInicial);

function filtrarTipo() {
    pruebaFiltro.innerHTML = "";
    let valorSelect = selectFiltrar.value;    
    
    datosFiltradosPokemon = funciones.filterData(datosPokemon, valorSelect);
    console.log(datosFiltradosPokemon);
    
    for (let i = 1; i < datosFiltradosPokemon.length; i++) {
    pruebaFiltro.innerHTML += 
    `<article class = "card__container">
        <img src = "${datosFiltradosPokemon[i].img}">
        <div class = "card__info">
            <div class = "container__flex">
                <h2 class = "pintarTitulo"> ${datosFiltradosPokemon[i].name} </h2>
                <h3> ${datosFiltradosPokemon[i].id} </h3>
            </div>
            <h3> ${datosFiltradosPokemon[i].type} </h3>
        </div>
    </article>
    `
    } 
}
