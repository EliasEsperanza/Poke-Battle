/* La sentencia `import { obtenerMovimientos, verEquipo,
vidaPokemonActivo, cambiarPokemon } from "../service/equipoService.js";` es importar funciones
específicas (`obtenerMovimientos`, `verEquipo`, `vidaPokemonActivo`, `cambiarPokemon `) del archivo
`equipoService.js` ubicado en el directorio `../service`. */
import { obtenerMovimientos, verEquipo, vidaPokemonActivo, cambiarPokemon } from "../service/equipoService.js";

/**
 * La función `obtenerMovimientosController` recupera movimientos de una batalla y jugador específicos
 * y los envía como respuesta JSON.
 * @param req - El parámetro `req` en la función `obtenerMovimientosController` es un objeto que
 * representa la solicitud HTTP. Contiene información sobre la solicitud realizada por el cliente, como
 * los parámetros de la solicitud, encabezados, cuerpo y otros datos relevantes. En este caso, el
 * objeto `req.params` se utiliza para extraer los parámetros de la URL de la solicitud, como `batallaId`.
 * @param res - El parámetro `res` en la función `obtenerMovimientosController` es el objeto de
 * respuesta que se utilizará para enviar una respuesta al cliente que realiza la solicitud. Por lo
 * general, se utiliza para enviar datos, códigos de estado y otra información al cliente.
 * @param next - El parámetro `next` en la función `obtenerMovimientosController` es una referencia a
 * la siguiente función middleware en el ciclo solicitud-respuesta de la aplicación. Se utiliza para
 * pasar el control a la siguiente función de middleware. Si ocurre un error durante la ejecución de la
 * función `obtenerMovimientosController` 
 */
export const obtenerMovimientosController = (req, res, next) => {
    const { batallaId, jugadorId } = req.params;
    try {
        const movimientos = obtenerMovimientos(batallaId, jugadorId);
        res.json(movimientos);
    } catch (e) {
        next(e);
    }
};

/**
 * La función verEquipoController recupera y devuelve los datos del equipo para una batalla y un
 * jugador específicos.
 * @param req - El parámetro `req` en la función `verEquipoController` es un objeto que representa la
 * solicitud HTTP. Contiene información sobre la solicitud realizada por el cliente, como los
 * parámetros de la solicitud, encabezados, cuerpo y otros detalles. En este caso, la función está
 * extrayendo `batallaId` y `jugadorId` de los parámetros de la URL de la solicitud.
 * @param res - El parámetro `res` en la función `verEquipoController` es el objeto de respuesta que se
 * utilizará para enviar una respuesta al cliente que realiza la solicitud. Normalmente se utiliza para
 * enviar datos, como el objeto `equipo` en este caso, de vuelta al cliente en el formato adecuado.
 * @param next - El parámetro `siguiente` en la función `verEquipoController` es una referencia a la
 * siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación. Se utiliza para
 * pasar el control a la siguiente función de middleware. Si ocurre un error durante la ejecución de la
 * función `verEquipo`, el control se pasa a la siguiente función de middleware para manejar el error.`
 */
export const verEquipoController = (req, res, next) => {
    const { batallaId, jugadorId } = req.params;
    try {
        const equipo = verEquipo(batallaId, jugadorId);
        res.json(equipo);
    } catch (e) {
        next(e);
    }
};

/**
 * La función `vidaPokemonActivoController` recupera los puntos de salud actuales de un Pokémon activo
 * en una batalla para un jugador específico.
 * @param req - El parámetro `req` en la función `vidaPokemonActivoController` es el objeto de
 * solicitud que contiene información sobre la solicitud HTTP realizada al servidor. Incluye detalles
 * como los encabezados de la solicitud, los parámetros, el cuerpo y otra información relevante
 * necesaria para procesar la solicitud.
 * @param res - El parámetro `res` en la función `vidaPokemonActivoController` es el objeto de
 * respuesta en Express.js. Se utiliza para enviar una respuesta al cliente que realiza la solicitud.
 * En este caso, la función envía una respuesta JSON que contiene los puntos de salud actuales del
 * Pokémon activo en un formato adecuado.
 * @param next - El parámetro `next` en la función `vidaPokemonActivoController` es una referencia a la
 * siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación. Se utiliza para
 * pasar el control a la siguiente función de middleware. Si se produce un error durante la ejecución
 * de la función de middleware actual, puede pasarlo a la siguiente función de middleware para manejar
 * el error.
 */
export const vidaPokemonActivoController = (req, res, next) => {
    const { batallaId, jugadorId } = req.params;
    try {
        const vida = vidaPokemonActivo(batallaId, jugadorId);
        res.json(vida);
    } catch (e) {
        next(e);
    }
};

/**
 * La función `cambiarPokemonController` maneja solicitudes para cambiar un Pokémon en una batalla para
 * un jugador específico.
 * @param req - El parámetro `req` en la función `cambiarPokemonController` representa el objeto de
 * solicitud. Contiene información sobre la solicitud HTTP realizada al servidor, incluidos los
 * parámetros, el cuerpo, los encabezados y otros detalles enviados por el cliente. En este caso, se
 * utiliza el objeto `req`
 * @param res - El parámetro `res` en la función `cambiarPokemonController` es el objeto de respuesta
 * en Express.js. Se utiliza para enviar una respuesta al cliente que realiza la solicitud. En esta
 * función se utiliza para enviar una respuesta JSON con los datos del nuevo Pokémon o un mensaje de
 * error en caso de que ocurra un error durante la ejecución de la función.
 * @param next - El parámetro `siguiente` en la función `cambiarPokemonController` es una función de
 * devolución de llamada que se utiliza para pasar el control a la siguiente función de middleware en
 * la pila. Si ocurre un error durante la ejecución de la función `cambiarPokemonController`, se llama
 * a la función `next` con
 * @returns Si el `indice` en el cuerpo de la solicitud no es un número, se devolverá una respuesta con
 * estado 400 y un objeto JSON que contiene el mensaje 'Índice inválido'. En caso contrario, si la
 * función `cambiarPokemon` se ejecuta exitosamente, la respuesta será un objeto JSON con los datos del
 * nuevo Pokémon. Si ocurre un error durante la ejecución del `cambiarPokemon ` se pasará el control a
 * la siguiente función de middleware para manejar el error.
 */
export const cambiarPokemonController = (req, res, next) => {
    const { batallaId, jugadorId } = req.params;
    const { indice } = req.body;

    if (typeof indice !== 'number') {
        return res.status(400).json({ message: 'Índice inválido' });
    }

    try {
        const nuevoPokemon = cambiarPokemon(batallaId, jugadorId, indice);
        res.json(nuevoPokemon);
    } catch (e) {
        next(e);
    }
};

