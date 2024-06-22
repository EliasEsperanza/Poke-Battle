import { Movimiento } from './Movimiento.js';

export class Pokemon {
    constructor(id, nombre, hp, ataque, defensa, velocidad, ataqueEspecial, defensaEspecial, movimientos) {
        this.id = id;
        this.nombre = nombre;
        this.hp = hp;
        this.ataque = ataque;
        this.defensa = defensa;
        this.velocidad = velocidad;
        this.ataqueEspecial = ataqueEspecial;
        this.defensaEspecial = defensaEspecial;
        this.movimientos = movimientos.map(mov => new Movimiento(mov.id, mov.nombre, mov.tipo, mov.pp, mov.power, mov.accuracy, mov.esEspecial));
    }

    recibirDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    noqueado() {
        return this.hp <= 0;
    }
}

