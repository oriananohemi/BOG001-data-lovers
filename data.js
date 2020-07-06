 const funciones = {

  sortData: function (data, sortBy, sortOrder) {  
    let dataOrdenada = data.sort((a,b) => a[sortBy] > b[sortBy] ? 1 : -1 )
    
    if (sortOrder === 'descendente') {
      dataOrdenada = dataOrdenada.reverse()
    }

    return dataOrdenada;
  },

  filterData: function (pokemon, condition) {
    let filtro = [""];
    for (let i = 0; i < pokemon.length; i++) {
      for (let j = 0; j < pokemon[i].type.length; j++) {
        if (pokemon[i].type[j] === condition) {
          filtro.push(pokemon[i]);          
        }
      }      
    }
    return filtro;
    //console.log(filtro);
  }
 }

export default funciones;
