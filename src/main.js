// import { example } from './data.js';
// import data from './data/lol/lol.js';
import data from './data/pokemon/pokemon.js';
import pokemon from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';

data.pokemon.map((pokemon) => {
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

  card.setAttribute("class", "card");

  card.appendChild(nombre);
  card.appendChild(image);
  card.appendChild(id);
  card.appendChild(tipo);


  document.getElementById("section").appendChild(card);
})

console.log(data);

//paginacion

let pok = [];


for (let i = 0; i < pokemon.length; i++) {
    pok.push(pokemon[i].name, `<img src= "${pokemon[i].img}"`);
}

//console.log(pok)
document.getElementById('pokemones').innerHTML = pok;


//Los valores de tipo pokemon estan en ingles

let pageNumber = 1;         //En que pagina se inicia....en la primera                  
let pageSize = 12;          //Cantidad de elementos que se van a mostrar por pagina     
let pokemonesHtml = [];       //array que muestra el html de los pokemones  
let pagination;             //elementos que se van a mostrar en la pagina actual    
let pageCont = Math.ceil(pok.length / pageSize); //contenido de la pagina, se utiliza ceil para aproximar hacia arriba 

function paginate(array, page_size, page_number) {      
    return array.slice((page_number - 1) * page_size, page_number * page_size);  //intervalo del array
}

function nextPage(){
    pageNumber ++;
    showPokemons(pagination)
}

function previusPage(){
    pageNumber --;
    showPokemons(pagination)
}

function showPokemons(){
    let pagination = paginate (pok,pageSize,pageNumber); //array, elementos por pag, pagina en que inicia 
    //console.log("nextPage",pagination)
    pokemonesHtml = "<ul>";
    pagination.forEach(function(element){   //agregar cada elemento a una lista html
        console.log(element);
        pokemonesHtml += "<li>"+ element +"</li>";  
    })
    pokemonesHtml += "</ul>";
    pokemonesHtml += pageNumber > 1  ? "<button onclick='previusPage()'>Anterior</button>":"";
    pokemonesHtml += pageNumber < pageCont ? " <button onclick='nextPage()'>Siguiente</button>":"" ;
    document.getElementById("list_pokemons").innerHTML = "";
    document.getElementById("list_pokemons").innerHTML = pokemonesHtml;
    //console.log(pokemonesHtml);
}

showPokemons(pagination);
