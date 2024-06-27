/* La línea `import {batallaService} from './batallaService.js';` está importando el objeto
`batallaService` desde un archivo llamado `batallaService.js`. Esto permite que el archivo
JavaScript actual acceda y utilice las funciones o variables exportadas desde `batallaService.js`
dentro de su propio código. */
import {batallaService} from './batallaService.js';

/**
 * La función `obtenerMovimientos` recupera los movimientos de los Pokémon activos pertenecientes a un
 * jugador específico en una batalla.
 * @param batallaId - El parámetro `batallaId` representa el ID de una batalla.
 * @param jugadorId - El parámetro `jugadorId` en la función `obtenerMovimientos` representa el ID de
 * un jugador en una batalla. Esta ID se utiliza para identificar los movimientos de qué jugador se
 * recuperan de los datos de la batalla.
 * @returns La función `obtenerMovimientos` devuelve la lista de movimientos de los Pokémon activos del
 * jugador identificado por `jugadorId` en la batalla identificada por `batallaId`.
 */
export const obtenerMovimientos = (batallaId, jugadorId) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    const movimientos = jugador.getPokemonActivo().movimientos;
    return movimientos;
};

/**
 * La función `verEquipo` recupera la lista de Pokémon que pertenecen a un jugador específico en una
 * batalla según el ID de batalla y el ID de jugador proporcionados.
 * @param batallaId - El parámetro `batallaId` es el identificador único de una batalla. Se utiliza
 * para recuperar información sobre una batalla específica del `batallaService`.
 * @param jugadorId - El parámetro `jugadorId` en la función `verEquipo` representa el ID de un jugador
 * en una batalla. La función recupera el equipo de Pokémon del jugador a partir de los datos de
 * batalla basándose en el `jugadorId` proporcionado.
 * @returns La función `verEquipo` devuelve una serie de Pokémon que pertenecen a un jugador específico
 * en una batalla. El jugador se determina en función del `jugadorId` proporcionado como argumento. La
 * función primero recupera el objeto de batalla usando `batallaService.obtenerBatalla(batallaId)`,
 * luego determina el jugador basándose en `jugadorId` y devuelve la matriz de Pokémon que pertenecen
 */
export const verEquipo = (batallaId, jugadorId) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    return jugador.pokemones;
}

/**
 * La función `vidaPokemonActivo` recupera el nombre y HP del Pokémon activo de un jugador específico
 * en una batalla.
 * @param batallaId - El parámetro `batallaId` representa el ID de una batalla. Esta función
 * `vidaPokemonActivo` está diseñada para recuperar información sobre los Pokémon activos en una
 * batalla según el `batallaId` y el `jugadorId` (ID de jugador) proporcionados.
 * @param jugadorId - El parámetro `jugadorId` representa el ID de un jugador en una batalla.
 * @returns Se devuelve un objeto con las propiedades "nombre" que representa el nombre del Pokémon
 * activo y "hp" que representa los puntos de vida actuales del Pokémon activo.
 */
export const vidaPokemonActivo = (batallaId, jugadorId) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    const pokemonActivo = jugador.getPokemonActivo();
    return { nombre: pokemonActivo.nombre, hp: pokemonActivo.hp };
}

/**
 * La función `cambiarPokemon` cambia el Pokémon activo de un jugador en una batalla y devuelve el
 * nombre y HP del nuevo Pokémon.
 * @param batallaId - El parámetro `batallaId` es el identificador de la batalla en la que el jugador
 * quiere cambiar su Pokémon.
 * @param jugadorId - El parámetro `jugadorId` en la función `cambiarPokemon` representa el ID del
 * jugador que está cambiando de Pokémon en una batalla.
 * @param indice - El parámetro `indice` en la función `cambiarPokemon` representa el índice del
 * Pokémon al que el jugador quiere cambiar en su equipo. Se utiliza para seleccionar el Pokémon
 * específico del equipo del jugador que se cambiará a la batalla.
 * @returns La función `cambiarPokemon` devuelve un objeto con las propiedades `nombre` y `hp` del
 * Pokémon recién seleccionado después de que el jugador ha cambiado su Pokémon activo en una batalla.
 */
export const cambiarPokemon = (batallaId, jugadorId, indice) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    const nuevoPokemon = jugador.cambiarPokemon(indice);
    return { nombre: nuevoPokemon.nombre, hp: nuevoPokemon.hp };
}