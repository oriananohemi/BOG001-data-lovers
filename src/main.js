import data from './data/pokemon/pokemon.js';
import funciones from './data.js';

const datosPokemon = data.pokemon

const main = document.getElementById("contenedorTodaData");

const containerPokemones = document.getElementById("pokemones")


const modal = document.getElementById("modal");
const botonCerrarModal = document.getElementById("cerrar");

const botonSiguiente = document.getElementById("siguiente");
const botonAnterior = document.getElementById("anterior");
const menuHamburguesa = document.getElementById("menuTrigger");


const selectFiltrar = document.getElementById('buscar__type');
const ordenar = document.getElementById('ordenarPorNombre');

const pokemonesPorPagina = 12;
const separacionPaginas = Math.ceil(datosPokemon.length / pokemonesPorPagina);

let paginaInicial = 1;  

let vistaInicial;


function agregarEscuchador(){
    const links = document.querySelectorAll(".header__link");
    links.forEach(link => link.addEventListener("click", cambiarVista) )
}

function cambiarVista(evento){    
    document.querySelectorAll(".paginas").forEach(vista => vista.classList.add("hidden"))
    const linkActivo = document.querySelector(".header__link__active")
    linkActivo.classList.remove("header__link__active")
    cerrarModal()


    const enlace = evento.target;

    enlace.classList.add("header__link__active")
    const vista = enlace.getAttribute("href").slice(1);
    document.getElementById(vista).classList.remove("hidden")

    paginaInicial = 1
    vistaInicial = vista
    mostrarPokemon(vistaInicial)
    menu()
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
    debilidades.setAttribute("class", "debilidades")
    
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

function mostrarPokemon(vista){

    let datosAPintar;
    let contenedorPokemones; 

    if(vista === 'ordenar') {
        const containerPokemonesOrdenados = document.getElementById("pokemonesOrdenados");
        containerPokemonesOrdenados.innerHTML = '';
        let formaOrdenar = ordenar.value;
        const d = datosPokemon.slice()
        datosAPintar = funciones.sortData(d, 'name', formaOrdenar );
        contenedorPokemones = containerPokemonesOrdenados;
    } else {
        borrarContenido()
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
    botonSiguiente.style.display = pagina+1 > separacionPaginas ? "none" : "block" ;
}

function revisarBotonAtras(pagina){
    botonAnterior.style.display = pagina-1 === 0 ? "none" : "block" ;
}

function cambiarPagina(event, vista){
    window.scrollTo(0, 0)
    borrarContenido();    
    if(event.target.id === "siguiente"){
        paginaInicial ++;
    } else {
        paginaInicial--
    }
    
    mostrarPokemon(vista)
    revisarBotonAtras(paginaInicial);
    revisarBotonSiguiente(paginaInicial);
    // menu()
}

function menu() {
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

    const infoPokemon = document.getElementsByClassName("modal__pokemon__info")[0];
        
    infoPokemon.innerHTML = 
    `<div class = "modal__container-img">
        <img class = "modal__img" src = "./image/pngflow.png" >
        <img class = "modal__image-pokemon" src = "${pokemon.img}">
    </div>
    <div class = "modal__container-info">
        <h2>${pokemon.name} ID. ${pokemon.id}</h2>
        <div class = "modal__features">
            <div>
                <p>Altura: <span> ${pokemon.height} </span></p>
                <p>Peso: <span> ${pokemon.weight} </span></p>
                <p>Caramelo: <span> ${pokemon.candy} </span></p>
                <p>Recuento de Caramelos: <span> ${pokemon.candy_count} </span></p>
            </div>
            <div class = "modal__type">
                <p>Tipo: </p>
                <p><span>${pokemon.type}</span></p>
                <p>Debilidad: </p>
                <p><span>${pokemon.weaknesses}</span></p>
            </div>
        </div>
    </div>`   
}

function filtrarTipo() {
    const pruebaFiltro = document.getElementById('pruebaFiltro');

    pruebaFiltro.innerHTML = "";
    let valorSelect = selectFiltrar.value;    
    
    let datosFiltradosPokemon = funciones.filterData(datosPokemon, valorSelect);

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

botonSiguiente.addEventListener("click", ()=> cambiarPagina(event, vistaInicial))
botonAnterior.addEventListener("click", ()=> cambiarPagina(event, vistaInicial))
menuHamburguesa.addEventListener("click", menu)
botonCerrarModal.addEventListener("click", cerrarModal)
selectFiltrar.addEventListener('change', filtrarTipo)
ordenar.addEventListener('change', ()=> mostrarPokemon('ordenar'))

revisarBotonAtras(paginaInicial);
revisarBotonSiguiente(paginaInicial);
agregarEscuchador()