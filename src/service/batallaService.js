/* Estas líneas de código importan módulos o clases específicas de otros archivos JavaScript. Esto es
lo que hace cada declaración de importación: */
/* La línea `import {Batalla} from '../models/Batalla.js';` está importando la clase `Batalla` desde el
archivo `Batalla.js` ubicado en el directorio `models`. Esto permite que el archivo JavaScript
actual use la clase `Batalla` definida en `Batalla.js` para crear instancias de la clase `Batalla` y
acceder a sus propiedades y métodos. */
import { Batalla } from '../models/Batalla.js';
/* La línea `import { realizarAtaque } from './ataquesService.js';` está importando la función
`realizarAtaque` desde el archivo `ataquesService.js`. Esto permite que el archivo JavaScript actual
use la función `realizarAtaque` definida en `ataquesService.js` para realizar ataques durante una
batalla. */
import { realizarAtaque, enviarAtaque, recibirAtaque } from './ataquesService.js';
/* La línea `import { Jugador } from '../models/Jugador.js';` está importando la clase `Jugador` desde
el archivo `Jugador.js` ubicado en el directorio `models`. Esto permite que el archivo JavaScript
actual use la clase `Jugador` definida en `Jugador.js` para crear instancias de la clase `Jugador` y
acceder a sus propiedades y métodos. */
import { Jugador } from '../models/Jugador.js';
/* La línea `importar {Pokemon} desde '../models/Pokemon.js';` importa la clase `Pokemon` del archivo
`Pokemon.js` ubicado en el directorio `models`. Esto permite que el archivo JavaScript actual use la
clase `Pokemon` definida en `Pokemon.js` para crear instancias de la clase `Pokemon` y acceder a sus
propiedades y métodos. */
import { Pokemon } from '../models/Pokemon.js';

/* La clase `BatallaService` gestiona la creación de salas de batalla, uniendo a los jugadores en las
batallas, manejando ataques y proporcionando resúmenes de batalla en un sistema de batalla Pokémon. */
class BatallaService {
    constructor() {
        this.batallasActivas = {};
        this.salasDeEspera = {};
        this.ataquesPendientes = {};
    }

   /**
    * La función "crearSala" crea una nueva sala para un jugador con su equipo Pokémon elegido.
    * @param nombreJugador - El parámetro "nombreJugador" es el nombre del jugador que se va a unir a
    * la sala.
    * @param pokemonesJugador - El parámetro `pokemonesJugador` es una matriz que contiene información
    * sobre los Pokémon del jugador. Cada elemento de la matriz representa un Pokémon e incluye las
    * siguientes propiedades:
    * @returns Se devuelve un `salaId` aleatorio después de crear un nuevo jugador (`jugador`) con el
    * `nombreJugador` y los `pokemonesJugador` proporcionados. Los Pokémon del jugador se crean en base
    * a los datos proporcionados para cada Pokémon en la matriz `pokemonesJugador`. Luego, el
    * reproductor se almacena en el objeto `salasDeEspera` con el
    */
    crearSala(nombreJugador, pokemonesJugador) {
        const salaId = Math.random().toString(36).substring(7);
        const jugador = new Jugador(nombreJugador, pokemonesJugador.map(pokemon => new Pokemon(pokemon.id, pokemon.nombre, pokemon.hp, pokemon.ataque, pokemon.defensa, pokemon.velocidad, pokemon.ataqueEspecial, pokemon.defensaEspecial, pokemon.movimientos)));
        this.salasDeEspera[salaId] = { jugador1: jugador };
        return salaId;
    }

    /**
     * La función `unirseSala` une a un jugador a una sala, crea una nueva batalla entre dos jugadores
     * y elimina la sala de la lista de espera.
     * @param salaId - El parámetro `salaId` es el identificador de la sala a la que el jugador quiere
     * unirse.
     * @param nombreJugador - El parámetro "nombreJugador" representa el nombre del jugador que quiere
     * unirse a la sala.
     * @param pokemonesJugador - El parámetro `pokemonesJugador` es una matriz que contiene información
     * sobre los Pokémon del jugador. Cada elemento de la matriz representa un Pokémon e incluye las
     * siguientes propiedades:
     * @returns La función `unirseSala` devuelve el `batallaId` después de crear un nuevo jugador y una
     * batalla entre el jugador existente en la sala y el nuevo jugador.
     */
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

    /**
     * La función "crearBatalla" genera un ID de batalla aleatorio y crea una nueva batalla entre dos
     * jugadores, almacenándola en un objeto de batallas activas.
     * @param jugador1 - Objeto del jugador 1 que contiene información como nombre, nivel, estadísticas
     * y habilidades.
     * @param jugador2 - El parámetro `jugador2` en la función `crearBatalla` representa al segundo
     * jugador o participante de una batalla. Esta función crea una batalla entre dos jugadores,
     * `jugador1` y `jugador2`, y asigna una ID de batalla aleatoria a esta batalla.
     * @returns La función `crearBatalla(jugador1, jugador2)` devuelve el `batallaId`, que es una
     * cadena generada aleatoriamente que se utiliza para identificar la batalla que se creó entre
     * `jugador1` y `jugador2`.
     */
    crearBatalla(jugador1, jugador2) {
        const batallaId = Math.random().toString(36).substring(7);
        const batalla = new Batalla(jugador1, jugador2);
        this.batallasActivas[batallaId] = batalla;
        return batallaId;
    }

   /**
    * La función "obtenerBatalla" recupera un objeto de batalla basado en el ID de batalla
    * proporcionado de una colección de batallas activas.
    * @param batallaId - El parámetro "batallaId" es el identificador único de una batalla en un
    * sistema o aplicación. Se utiliza para buscar y obtener información específica sobre una batalla
    * en particular.
    * @returns La función `obtenerBatalla` devuelve el objeto de batalla con el `batallaId`
    * especificado del array `batallasActivas`. Si no se encuentra la batalla arrojará un error con el
    * mensaje 'Batalla no encontrada'.
    */
    obtenerBatalla(batallaId) {
        const batalla = this.batallasActivas[batallaId];
        if (!batalla) {
            throw new Error('Batalla no encontrada');
        }
        return batalla;
    }

    /**
     * La función "ataque" maneja un escenario de batalla donde un jugador ataca con un
     * movimiento específico, calcula el daño y los posibles nocauts, y determina el resultado de la
     * batalla.
     * @param batallaId - El parámetro `batallaId` en la función `ataque` representa el identificador
     * único de la batalla en la que se está llevando a cabo el ataque. Se utiliza para recuperar la
     * instancia de batalla específica de la que se obtienen los Pokémon atacantes y defensores.
     * @param jugadorId - El parámetro `jugadorId` en la función `ataque` representa el ID del jugador
     * que inicia el ataque en una batalla. Esta identificación se utiliza para identificar qué jugador
     * está realizando el ataque y recuperar su Pokémon activo para la batalla.
     * @param nombreMovimiento - El parámetro `nombreMovimiento` en la función `ataque` representa el
     * nombre del movimiento que utilizará el Pokémon atacante durante la batalla. Este parámetro se
     * utiliza para determinar qué movimiento realizará el Pokémon y calcular el daño que le causará al
     * Pokémon del oponente. Es esencial para ejecutar
     * @returns La función `ataque` devuelve un objeto con las siguientes propiedades:
     * - `daño`: La cantidad de daño causado por el ataque.
     * - `movimiento`: El nombre del ataque utilizado.
     * - `atacante`: El nombre del Pokémon atacante.
     * - `defensor`: El nombre del Pokémon defensor.
     * - `mensaje`: Un mensaje que indica si el Pokémon defensor fue eliminado 
     */
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

    /**
     * La función "obtenerResumenBatalla" recupera un resumen de una batalla incluyendo los nombres de
     * los jugadores, sus Pokémon con HP y movimientos.
     * @param batallaId - La función `obtenerResumenBatalla(batallaId)` toma un `batallaId` como
     * parámetro, que se utiliza para recuperar información sobre una batalla específica. Luego, la
     * función construye un resumen de la batalla que incluye detalles sobre los jugadores, sus Pokémon
     * y sus movimientos.
     * @returns La función `obtenerResumenBatalla(batallaId)` devuelve un resumen de una batalla basado
     * en el `batallaId` proporcionado. El resumen incluye información sobre ambos jugadores
     * involucrados en la batalla, incluidos sus nombres y sus respectivos Pokémon. Para el Pokémon de
     * cada jugador, el resumen incluye la identificación del Pokémon, el nombre, HP (puntos de vida) y
     * una lista de movimientos que el Pokémon puede
     */
    obtenerResumenBatalla(batallaId) {
        const batalla = this.obtenerBatalla(batallaId);
        const resumen = {
            jugador1: {
                nombre: batalla.jugador1.nombre,
                pokemones: batalla.jugador1.pokemones.map(p => ({
                    id: p.id,
                    nombre: p.nombre,
                    hp: p.hp,
                    movimientos: p.movimientos.map(m => m.nombre)
                }))
            },
            jugador2: {
                nombre: batalla.jugador2.nombre,
                pokemones: batalla.jugador2.pokemones.map(p => ({
                    id: p.id,
                    nombre: p.nombre,
                    hp: p.hp,
                    movimientos: p.movimientos.map(m => m.nombre)
                }))
            }
        };
        return resumen;
    }

    // Método para que un jugador envíe un ataque
    enviarAtaque(batallaId, jugadorId, nombreMovimiento) {
        const batalla = this.obtenerBatalla(batallaId);
        const atacante = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
        const atacanteActivo = atacante.getPokemonActivo();
        const movimiento = atacanteActivo.movimientos.find(mov => mov.nombre === nombreMovimiento);

        if (!movimiento) {
            throw new Error('El movimiento no existe');
        }

        if (!this.ataquesPendientes[batallaId]) {
            this.ataquesPendientes[batallaId] = {};
        }

        this.ataquesPendientes[batallaId][jugadorId] = { atacante: atacanteActivo, movimiento };

        return {
            message: `Ataque ${nombreMovimiento} enviado por ${atacante.nombre}`
        };
    }

    // Método para procesar los ataques de ambos jugadores
    procesarAtaques(batallaId) {
        const batalla = this.obtenerBatalla(batallaId);

        if (!this.ataquesPendientes[batallaId] || Object.keys(this.ataquesPendientes[batallaId]).length < 2) {
            throw new Error('Ambos jugadores deben enviar sus ataques primero');
        }

        const [jugador1, jugador2] = [batalla.jugador1, batalla.jugador2];
        const [ataque1, ataque2] = [this.ataquesPendientes[batallaId][jugador1.nombre], this.ataquesPendientes[batallaId][jugador2.nombre]];

        const [pokemon1, pokemon2] = [ataque1.atacante, ataque2.atacante];
        const [movimiento1, movimiento2] = [ataque1.movimiento, ataque2.movimiento];

        const velocidad1 = pokemon1.velocidad;
        const velocidad2 = pokemon2.velocidad;

        let resultados = [];

        if (velocidad1 >= velocidad2) {
            resultados.push(this.aplicarAtaque(pokemon2, pokemon1, movimiento1));
            if (pokemon2.hp > 0) {
                resultados.push(this.aplicarAtaque(pokemon1, pokemon2, movimiento2));
            }
        }else if(velocidad1==velocidad2){
            const random = Math.floor(Math.random() * 2);
            if(random == 0){
                resultados.push(this.aplicarAtaque(pokemon2, pokemon1, movimiento1));
                if (pokemon2.hp > 0) {
                    resultados.push(this.aplicarAtaque(pokemon1, pokemon2, movimiento2));
                }
            }else{
                resultados.push(this.aplicarAtaque(pokemon1, pokemon2, movimiento2));
                if (pokemon1.hp > 0) {
                    resultados.push(this.aplicarAtaque(pokemon2, pokemon1, movimiento1));
                }
            }
        }else {
            resultados.push(this.aplicarAtaque(pokemon1, pokemon2, movimiento2));
            if (pokemon1.hp > 0) {
                resultados.push(this.aplicarAtaque(pokemon2, pokemon1, movimiento1));
            }
        }

        delete this.ataquesPendientes[batallaId];

        return resultados;
    }

    // Función auxiliar para aplicar el ataque y devolver el resultado
    aplicarAtaque(defensor, atacante, movimiento) {
        const resultado = recibirAtaque(defensor, atacante, movimiento);
        return {
            atacante: atacante.nombre,
            defensor: defensor.nombre,
            movimiento: movimiento.nombre,
            damage: resultado.damage,
            noqueado: resultado.noqueado
        };
    }
    
}

/* La línea `export const batallaService = new BatallaService();` está exportando una instancia de la
clase `BatallaService` como `batallaService`. Esto permite que otros módulos o archivos importen y
utilicen la instancia `batallaService` para acceder a los métodos y funcionalidades proporcionadas
por la clase `BatallaService`. Al exportar la instancia de esta manera, se puede importar y utilizar
en otras partes de la aplicación donde se necesita la funcionalidad "BatallaService". */
export const batallaService = new BatallaService();
