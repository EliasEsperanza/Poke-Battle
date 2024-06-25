/* La línea `import { Movimiento } from './Movimiento.js';` está importando la clase `Movimiento` desde
un archivo llamado `Movimiento.js`. Esto permite que la clase `Pokemon` use la clase `Movimiento`
dentro de su constructor para crear instancias de objetos `Movimiento` y completar la propiedad
`movimientos` con esos objetos. Esta es una forma de organizar y modularizar el código separando
diferentes clases en sus propios archivos e importándolos cuando sea necesario. */
import { Movimiento } from './Movimiento.js';

/* La clase `Pokemon` en JavaScript representa un Pokémon con varios atributos y métodos, como recibir
daño y comprobar si está fuera de combate. */
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

    /**
     * La función "recibirDamage" reduce los hp de un objeto en una cantidad específica y garantiza que
     * no baje de 0.
     * @param damage - La función `recibirDamage` se utiliza para reducir los puntos de salud (`hp`) de
     * un objeto en una cierta cantidad especificada por el parámetro `damage`. Si los puntos de vida
     * resultantes después de deducir el daño son inferiores a 0, los puntos de vida se establecen en 0
     * para evitar valores negativos.
     */
    recibirDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    /**
     * La función "noqueado" comprueba si la propiedad "hp" del objeto actual es menor o igual a 0.
     * @returns La función `noqueado()` devuelve un valor booleano que indica si el `hp` (que
     * representa puntos de vida) es menor o igual a 0.
     */
    noqueado() {
        return this.hp <= 0;
    }
}

