/* La línea `import { batallaService } from "../service/batallaService.js";` está importando el objeto
`batallaService` desde el archivo `batallaService.js` ubicado en el directorio `../service`. Esto
permite que el archivo JavaScript actual acceda y utilice las funciones o métodos definidos en el
objeto `batallaService` para manejar funcionalidades relacionadas con la batalla. */
import { batallaService } from "../service/batallaService.js";

/**
 * La función `crearSala` crea una sala de batalla con el nombre de un jugador y su Pokémon
 * seleccionado.
 * @param req - El parámetro `req` normalmente representa la solicitud HTTP en una aplicación Node.js.
 * Contiene información sobre la solicitud entrante, como los encabezados de la solicitud, los
 * parámetros, el cuerpo y más. En el fragmento de código proporcionado, `req` se utiliza para extraer
 * `nombreJugador` y `pokemones` del cuerpo de la solicitud.
 * @param res - El parámetro `res` en la función `crearSala` es el objeto de respuesta que se enviará
 * al cliente que realiza la solicitud. Se utiliza para enviar una respuesta al cliente con el mensaje
 * de éxito y el `salaId` creado, o un mensaje de error si se trata de una excepción.
 */
export const crearSala = (req, res) => {
    const { nombreJugador, pokemonesJugador } = req.body;

    try {
        const salaId = batallaService.crearSala(nombreJugador, pokemonesJugador);
        res.json({ message: 'Sala creada', salaId });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};


/**
 * La función `unirseSala` en JavaScript permite a un jugador unirse a una sala y crear una batalla con
 * el Pokémon elegido.
 * @param req - El parámetro `req` normalmente representa la solicitud HTTP en una aplicación Node.js.
 * Contiene información sobre la solicitud entrante, como encabezados, parámetros, cuerpo y más. En
 * esta función específica `unirseSala`, `req` se usa para extraer datos del cuerpo de la solicitud
 * mediante desestructuración.
 * @param res - El parámetro `res` en la función `unirseSala` es el objeto de respuesta que se enviará
 * al cliente que realiza la solicitud. Se utiliza para enviar una respuesta al cliente con el mensaje
 * de éxito y el `batallaId` generado, o un mensaje de error si
 */
export const unirseSala = (req, res) => {
    const { salaId, nombreJugador, pokemonesJugador } = req.body;

    try {
        const batallaId = batallaService.unirseSala(salaId, nombreJugador, pokemonesJugador);
        res.json({ message: 'Jugador unido a la sala, batalla creada', batallaId });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

/**
 * La función `crearBatalla` crea una batalla entre dos jugadores con sus respectivos equipos Pokémon.
 * @param req - El parámetro `req` en la función `crearBatalla` es un objeto que representa la
 * solicitud HTTP. Contiene información sobre la solicitud realizada al servidor, como el cuerpo de la
 * solicitud, encabezados, parámetros y más. En este caso, la función espera que el cuerpo de la
 * solicitud contenga el nombre y los Pokémon de los dos jugadores.
 * @param res - El parámetro `res` en la función `crearBatalla` es el objeto de respuesta que se
 * utilizará para enviar una respuesta al cliente que realiza la solicitud. Normalmente se utiliza para
 * enviar datos, como respuestas JSON, códigos de estado, encabezados, etc., al cliente. En este
 * caso, se utiliza para enviar un mensaje de éxito con el ID de la batalla creada o un mensaje de error.
 */
export const crearBatalla = (req, res) => {
    const { nombreJugador1, pokemonesJugador1, nombreJugador2, pokemonesJugador2 } = req.body;

    try {
        const jugador1 = new Jugador(nombreJugador1, pokemonesJugador1.map(pokemon => new Pokemon(pokemon.id, pokemon.nombre, pokemon.hp, pokemon.ataque, pokemon.defensa, pokemon.velocidad, pokemon.ataqueEspecial, pokemon.defensaEspecial, pokemon.movimientos)));
        const jugador2 = new Jugador(nombreJugador2, pokemonesJugador2.map(pokemon => new Pokemon(pokemon.id, pokemon.nombre, pokemon.hp, pokemon.ataque, pokemon.defensa, pokemon.velocidad,pokemon.ataqueEspecial, pokemon.defensaEspecial, pokemon.movimientos)));

        const batallaId = batallaService.crearBatalla(jugador1, jugador2);
        res.json({ message: 'Batalla creada', batallaId });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

/**
 * La función `ataque` maneja el ataque en una batalla por parte de un jugador con un movimiento
 * específico y devuelve el resultado.
 * @param req - El parámetro `req` en la función `ataque` es el objeto de solicitud, que contiene
 * información sobre la solicitud HTTP entrante, como parámetros, cuerpo, encabezados, etc.
 * Generalmente lo proporciona el marco Express.js cuando se manejan solicitudes HTTP.
 * @param res - El parámetro `res` en la función `ataque` es el objeto de respuesta que se utilizará
 * para enviar una respuesta al cliente que realiza la solicitud. Normalmente se utiliza para enviar
 * datos, como respuestas JSON, códigos de estado, encabezados, etc., al cliente. en el proporcionado
 */
export const ataque = (req, res) => {
    const { batallaId } = req.params;
    const { jugadorId, nombreMovimiento } = req.body;

    try {
        const resultado = batallaService.ataque(batallaId, jugadorId, nombreMovimiento);
        res.json({ message: 'Ataque realizado', resultado });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

/**
 * La función "obtenerResumen" recupera un resumen de una batalla según el ID de batalla proporcionado.
 * @param req - El parámetro `req` en la función `obtenerResumen` suele ser un objeto que representa la
 * solicitud HTTP que recibe el servidor. Contiene información sobre la solicitud, como los
 * encabezados, los parámetros, el cuerpo y otros detalles de la solicitud. En esta función específica,
 * `req.params` se usa para extraer el `batallaId` de los parámetros de la solicitud.
 * @param res - El parámetro `res` en la función `obtenerResumen` es el objeto de respuesta que se
 * utilizará para enviar una respuesta al cliente que realiza la solicitud. En este caso, se espera que
 * la función recupere un resumen de una batalla usando el parámetro `batallaId` de la solicitud.
 */
export const obtenerResumen = (req, res) => {
    const { batallaId } = req.params;
    const resumen = batallaService.obtenerResumenBatalla(batallaId);
    res.json(resumen);
};

