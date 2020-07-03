 const funciones = {

  dataSort: function (data) {
  const dataOrdenada = data.reverse()
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
  }
 }
// export const sortData = (data, sortBy, sortOrder) => {
//   return 'OMG';
// };

export default funciones;
