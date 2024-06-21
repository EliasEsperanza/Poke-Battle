import { Batalla } from '../models/Batalla.js';
import { realizarAtaque } from './ataquesService.js';

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
        if (movimiento.pp <= 0) {
            throw new Error('No hay PP suficientes para realizar el ataque');
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

    obtenerResumenBatalla = (batallaId) => {
        const batalla = this.obtenerBatalla(batallaId);
        const resumen = {
            jugador1: {
                nombre: batalla.jugador1.nombre,
                pokemones: batalla.jugador1.pokemones.map(p => ({
                    nombre: p.nombre,
                    hp: p.hp,
                    movimientos: p.movimientos.map(m => m.nombre)
                }))
            },
            jugador2: {
                nombre: batalla.jugador2.nombre,
                pokemones: batalla.jugador2.pokemones.map(p => ({
                    nombre: p.nombre,
                    hp: p.hp,
                    movimientos: p.movimientos.map(m => m.nombre)
                }))
            }
        };
        return resumen;
    }
}

export const batallaService = new BatallaService();
