/* La clase Movimiento representa un movimiento en un juego de Pokémon con propiedades como id, nombre,
tipo, puntos de poder, potencia, precisión y si es un movimiento especial. */
export class Movimiento {
    constructor(id, nombre, tipo, pp, power, accuracy, esEspecial = false) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.pp = pp;
        this.power = power;
        this.accuracy = accuracy;
        this.esEspecial = esEspecial;
    }
}