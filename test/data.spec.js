import funciones from '../src/data';
import data from '../src/data/pokemon/pokemon.js';


describe('funciones.filterData', () => {
  const datos = data.pokemon.slice()
  
  it('Es una funcion', () => {
    expect(typeof funciones.filterData).toBe('function');
  });

  it('Deberia devolver un objeto para tipo Fuego', () => {
    expect(typeof funciones.filterData(datos, "Fuego")).toBe('object');
  });

  it('Deberia devolver Pikachu para tipo Electrico', () => {
    expect(funciones.filterData(datos, "Electrico")[0].name).toEqual('Pikachu');
  });

  it('Deberia devolver un arreglo de 3 elementos para tipo Dragon', () => {
    expect(funciones.filterData(datos, "Dragon")).toHaveLength(3);
  });
 });

 describe('funciones.sortData', () => {
   const datos = data.pokemon.slice()
  
  it('Es una funcion', () => {
    expect(typeof funciones.sortData).toBe('function');
  });

  it('Si se ordena de forma ascendente el primer pokemon es Abra', () => {
    expect(funciones.sortData(datos, "name", "ascendente")[0].name).toBe('Abra');
  });

  it('Si se ordena de forma ascendente el pokemon 35 es Exeggutor', () => {
    expect(funciones.sortData(datos, "name", "ascendente")[35].name).toEqual('Exeggutor');
  });

  it('Si se ordena de forma descendente el pokemon 47 es Pikachu', () => {
    expect(funciones.sortData(datos, "name", "descendente")[47].name).toBe('Pikachu');
  });

  it('Si se ordena de forma descendente el ultimo pokemon es Abra', () => {
    expect(funciones.sortData(datos, "name", "descendente")[150].name).toEqual('Abra');
  });
 });

 describe('funciones.computeStats', () => {
   const datos = data.pokemon.slice(0,3)
   
  it('Es una funcion', () => {
    expect(typeof funciones.computeStats).toBe('function');
  });

  it('Deberiamos esperar un promedio de 1.24 para altura en los tres primeros pokemones', () => {
    expect(funciones.computeStats(datos, "height")).toBe("1.24");
  }); 

  it('Deberiamos esperar un promedio de 39.97 para peso en los tres primeros pokemones', () => {
    expect(funciones.computeStats(datos, "weight")).toBe("39.97");
  });  
 });

 describe('funciones.loadJSON', () => {

 it('Es una funcion', () => {
   expect(typeof funciones.loadJSON).toBe('function');
 });

});
