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