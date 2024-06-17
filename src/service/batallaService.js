import { Batalla } from '../models/Batalla.js';
import { realizarAtaque } from './ataqueService.js';

class BatallaService {
    constructor() {
        this.batallasActivas = {};
    }

    crearBatalla(jugador1, jugador2) {
        const batallaId = Math.random().toString(36).substring(7);
        const batalla = new Batalla(jugador1, jugador2);
        this.batallasActivas[batallaId] = batalla;
        return batallaId;
    }

    obtenerBatalla(batallaId) {
        const batalla = this.batallasActivas[batallaId];
        if (!batalla) {
            throw new Error('Batalla no encontrada');
        }
        return batalla;
    }

    ataque(batallaId, jugadorId, nombreMovimiento) {
        const batalla = this.obtenerBatalla(batallaId);
        const atacante = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
        const defensor = batalla.getOponente(atacante);

        const atacanteActivo = atacante.getPokemonActivo();
        const defensorActivo = defensor.getPokemonActivo();

        const movimiento = atacanteActivo.movimientos.find(mov => mov.nombre === nombreMovimiento);
        if (!movimiento) {
            throw new Error('El movimiento no existe');
        }

        const damage = realizarAtaque(atacanteActivo, defensorActivo, movimiento);
        const response = { damage, movimiento: movimiento.nombre, atacante: atacanteActivo.nombre, defensor: defensorActivo.nombre };

        if (defensorActivo.noqueado()) {
            response.message = `${defensorActivo.nombre} ha sido noqueado`;
            if (defensor.pokemonesUtilizables()) {
                const siguientePokemon = defensor.cambiarPokemon();
                response.siguientePokemon = `${defensor.nombre} ha cambiado a ${siguientePokemon.nombre}`;
            } else {
                response.message += ` y ${defensor.nombre} no tiene más Pokémon`;
                response.ganador = atacante.nombre;
            }
        }

        return response;
    }
}

export const batallaService = new BatallaService();
