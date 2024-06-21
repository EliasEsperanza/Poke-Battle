import { Movimiento } from './Movimiento.js';

export class Pokemon {
    constructor(id,nombre,hp,ataque,defensa, ataqueEspecial, defensaEspecial,movimientos){
        this.id = id;
        this.nombre = nombre;
        this.hp = hp;
        this.ataque = ataque;
        this.defensa = defensa;
        this.ataqueEspecial = ataqueEspecial;
        this.defensaEspecial = defensaEspecial;
        this.movimientos = movimientos.map(movimiento => new Movimiento(movimiento.id,movimiento.nombre,movimiento.tipo,movimiento.pp,movimiento.power,movimiento.accuracy));
    }

    recibirDamage(damage){
        this.hp -= damage;
        if(this.hp < 0){
            this.hp = 0;
        }
    }

    noqueado(){
        return this.hp === 0;
    }

}