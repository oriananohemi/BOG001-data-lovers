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
