export class Batalla{
    constructor(jugador1, jugador2){
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }

    getOponente(jugador){
        return jugador === this.jugador1 ? this.jugador2 : this.jugador1;
    }
}
