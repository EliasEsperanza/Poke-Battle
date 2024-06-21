import {batallaService} from './batallaService.js';

export const obtenerMovimientos = (batallaId, jugadorId) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    const movimientos = jugador.getPokemonActivo().movimientos;
    return movimientos;
}

export const verEquipo = (batallaId, jugadorId) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    return jugador.pokemones;
}

export const vidaPokemonActivo = (batallaId, jugadorId) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    const pokemonActivo = jugador.getPokemonActivo();
    return { nombre: pokemonActivo.nombre, hp: pokemonActivo.hp };
}

export const cambiarPokemon = (batallaId, jugadorId, indice) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    const nuevoPokemon = jugador.cambiarPokemon(indice);
    return { nombre: nuevoPokemon.nombre, hp: nuevoPokemon.hp };
}