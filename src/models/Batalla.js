/* La clase `Batalla` representa un juego de batalla entre dos jugadores e incluye un método para
capturar al oponente de un jugador determinado. */
export class Batalla{
    constructor(jugador1, jugador2){
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }

    /**
     * La función `getOponente` devuelve el oponente de un jugador determinado en un juego.
     * @param jugador - El parámetro "jugador" representa un jugador en un juego.
     * @returns La función `getOponente` devuelve el oponente de la entrada `jugador`. Si `jugador` es
     * igual a `this.jugador1`, entonces devuelve `this.jugador2`. En caso contrario, devuelve
     * `this.jugador1`.
     */
    getOponente(jugador){
        return jugador === this.jugador1 ? this.jugador2 : this.jugador1;
    }
}
