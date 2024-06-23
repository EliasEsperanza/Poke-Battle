import { Batalla } from '../models/Batalla.js';
import { realizarAtaque } from './ataquesService.js';
import { Jugador } from '../models/Jugador.js';
import { Pokemon } from '../models/Pokemon.js';

class BatallaService {
    constructor() {
        this.batallasActivas = {};
        this.salasDeEspera = {};
    }

    crearSala(nombreJugador, pokemonesJugador) {
        const salaId = Math.random().toString(36).substring(7);
        const jugador = new Jugador(nombreJugador, pokemonesJugador.map(pokemon => new Pokemon(pokemon.id, pokemon.nombre, pokemon.hp, pokemon.ataque, pokemon.defensa, pokemon.velocidad, pokemon.ataqueEspecial, pokemon.defensaEspecial, pokemon.movimientos)));
        this.salasDeEspera[salaId] = { jugador1: jugador };
        return salaId;
    }

    unirseSala(salaId, nombreJugador, pokemonesJugador) {
        const sala = this.salasDeEspera[salaId];
        if (!sala) {
            throw new Error('Sala no encontrada');
        }
        const jugador2 = new Jugador(nombreJugador, pokemonesJugador.map(pokemon => new Pokemon(pokemon.id, pokemon.nombre, pokemon.hp, pokemon.ataque, pokemon.defensa, pokemon.velocidad, pokemon.ataqueEspecial, pokemon.defensaEspecial, pokemon.movimientos)));
        const batallaId = this.crearBatalla(sala.jugador1, jugador2);
        delete this.salasDeEspera[salaId];
        return batallaId;
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

        const { damage, noqueado } = realizarAtaque(atacanteActivo, defensorActivo, movimiento);
        const response = { damage, movimiento: movimiento.nombre, atacante: atacanteActivo.nombre, defensor: defensorActivo.nombre };

        if (noqueado) {
            response.message = `${defensorActivo.nombre} ha sido noqueado`;
            if (defensor.pokemonesUtilizables()) {
                const siguientePokemon = defensor.cambiarPokemon();
                response.siguientePokemon = `${defensor.nombre} ha cambiado a ${siguientePokemon.nombre}`;
            } else {
                response.message += ` y ${defensor.nombre} no tiene más Pokémon. ${atacante.nombre} ha ganado la batalla!`;
                response.ganador = atacante.nombre;
            }
        }

        return response;
    }

    obtenerResumenBatalla(batallaId) {
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
