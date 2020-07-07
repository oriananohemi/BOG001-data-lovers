import funciones from '../src/data';
import data from '../src/data/pokemon/pokemon.js';


describe('funciones.filterData', () => {
  it('is a function', () => {
    expect(typeof funciones.filterData).toBe('function');
  });

  it('Deberia devolver un objeto para tipo Fuego', () => {
    expect(typeof funciones.filterData(data.pokemon, "Fuego")).toBe('object');
  });

  it('Deberia devolver Pikachu para tipo Electrico', () => {
    expect(funciones.filterData(data.pokemon, "Electrico")[1].name).toEqual('Pikachu');
  });

  it('Deberia devolver un arreglo de 4 elementos para tipo Dragon', () => {
    expect(funciones.filterData(data.pokemon, "Dragon")).toHaveLength(4);
  });
 });

 describe('funciones.sortData', () => {
  it('is a function', () => {
    expect(typeof funciones.sortData).toBe('function');
  });
  it('Si se ordena de forma ascendente el primer pokemon es Abra', () => {
    expect(funciones.sortData(data.pokemon, "name", "ascendente")[0].name).toBe('Abra');
  });
  it('Si se ordena de forma ascendente el pokemon 35 es Exeggutor', () => {
    expect(funciones.sortData(data.pokemon, "name", "ascendente")[35].name).toEqual('Exeggutor');
  });
  it('Si se ordena de forma descendente el pokemon 47 es Pikachu', () => {
    expect(funciones.sortData(data.pokemon, "name", "descendente")[47].name).toBe('Pikachu');
  });
  it('Si se ordena de forma descendente el ultimo pokemon es Abra', () => {
    expect(funciones.sortData(data.pokemon, "name", "descendente")[150].name).toEqual('Abra');
  });
 });
