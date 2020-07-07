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
 });

/*describe('anotherExample', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});*/
