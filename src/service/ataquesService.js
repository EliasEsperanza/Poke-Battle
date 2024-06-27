/* El objeto `efectividadTipo` representa una tabla de valores de
efectividad de tipo para diferentes tipos de ataques en una batalla Pokémon. Cada clave del objeto
corresponde a un tipo específico de ataque, y el valor asociado con cada clave es otro objeto que
asigna los tipos de defensa a multiplicadores de efectividad. */
const efectividadTipo = {
    'normal': {'fighting': 2, 'ghost': 0},
    'fire': {'water': 0.5, 'grass': 2, 'steel': 0.5, 'bug': 2, 'fairy': 2, 'ice': 2},
    'water': {'fire': 2, 'grass': 0.5, 'ground': 2, 'rock': 2},
    'grass': {'water': 2, 'fire': 0.5, 'ground': 0.5, 'rock': 2, 'flying': 2, 'bug': 2},
    'electric': {'water': 2, 'flying': 0.5, 'ground': 0},
    'ice': {'grass': 2, 'ground': 2, 'flying': 2, 'dragon': 2},
    'fighting': {'normal': 0.5, 'ice': 2, 'rock': 0.5, 'dark': 2, 'flying': 0.5, 'psychic': 0.5, 'bug': 0.5, 'fairy': 2, 'poison': 0.5},
    'poison': {'grass': 2, 'fairy': 2, 'fighting': 2, 'bug': 2, 'poison': 0.5, 'psychic': 0.5},
    'ground': {'fire': 2, 'electric': 2, 'rock': 2, 'steel': 2, 'poison': 0.5, 'grass': 2},
    'flying': {'grass': 0.5, 'fighting': 2, 'bug': 0.5, 'electric': 2, 'ice': 0.5, 'rock': 2},
    'psychic': {'fighting': 2, 'poison': 2, 'psychic': 0.5, 'dark': 0},
    'bug': {'grass': 0.5, 'psychic': 2, 'fighting': 0.5, 'flying': 2, 'dark': 2, 'fire': 0.5, 'ghost': 0.5},
    'rock': {'fire': 2, 'ice': 2, 'flying': 0.5, 'bug': 2, 'fighting': 2},
    'ghost': {'ghost': 2, 'psychic': 2, 'normal': 0},
    'dragon': {'dragon': 2},
    'steel': {'rock': 0.5, 'ice': 0.5, 'fairy': 2, 'steel': 0.5, 'grass': 0.5, 'bug': 0.5, 'flying': 0.5, 'normal': 0.5, 'poison': 0},
    'dark': {'ghost': 2, 'psychic': 2, 'fighting': 0.5, 'dark': 0.5, 'fairy': 2},
    'fairy': {'fighting': 0.5, 'dragon': 0, 'dark': 0.5, 'steel': 0.5, 'fire': 0.5}
};

/**
 * La función `precisionAtaque` devuelve verdadero con una probabilidad basada en el valor de precisión
 * de entrada.
 * @param accuracy - El parámetro "precisión" representa el porcentaje de precisión de un ataque. La
 * función `precisionAtaque` utiliza este valor de precisión para determinar si el ataque acierta o
 * falla en función de un número aleatorio generado entre 0 y 100. Si el número aleatorio es menor o
 * igual que el valor de precisión, el
 * @returns Se devuelve un valor booleano que indica si un número aleatorio entre 0 y 100 es menor o
 * igual que el valor de precisión proporcionado.
 */
const precisionAtaque = (accuracy) => {
    return Math.random() * 100 <= accuracy;
};

/**
 * La función calcula la efectividad de un ataque según el tipo de atacante y el tipo de defensor
 * mediante efectividadTipo.
 * @param tipoAtaque - `tipoAtaque` representa el tipo de ataque que se utiliza. Es una clave que se
 * utiliza para buscar la efectividad del ataque contra un tipo específico de defensor.
 * @param tipoDefensor - tipoDefensor representa el tipo de entidad defensora en una batalla, como un
 * tipo de Pokémon en una batalla Pokémon.
 * @returns 1
 */
const calcularEfectividad = (tipoAtaque, tipoDefensor) => {
    if (efectividadTipo[tipoAtaque] && efectividadTipo[tipoAtaque][tipoDefensor] !== undefined) {
        return efectividadTipo[tipoAtaque][tipoDefensor];
    }
    return 1; // Efectividad neutral si no se encuentra en la tabla
};

/**
 * La función calcula el daño causado por un movimiento en una batalla Pokémon en función de varios
 * factores, como las estadísticas del atacante, las estadísticas del defensor, la potencia del
 * movimiento, la precisión y la efectividad del tipo.
 * @param atacante - El parámetro "atacante" representa al atacante en una batalla. 
 * @param defensor - El parámetro "defensor" en la función representa al defensor en un
 * escenario de batalla. Es un pokemon que está siendo atacado por el
 * atacante (atacante) usando un movimiento específico (movimiento). Los atributos del defensor, como
 * estadísticas de defensa, tipo y
 * @param movimiento - El parámetro `movimiento` representa el movimiento que se utiliza en una
 * batalla. Contiene información como `power` (potencia base del movimiento), `esEspecial` (booleano
 * que indica si el movimiento es un ataque especial) y `tipo` (tipo de movimiento).
 * @returns La función "calcularDamage" devuelve el valor de daño calculado después de tener en cuenta
 * la precisión del ataque, el daño base del movimiento, la estadística de ataque del atacante, la
 * estadística de defensa del defensor, la efectividad del tipo de movimiento y luego redondea hacia
 * abajo el daño final. valor usando `Math.floor()`.
 */
export const calcularDamage = (atacante, defensor, movimiento) => {
    if (!precisionAtaque(movimiento.accuracy)) {
        return 0;
    }

    const baseDamage = movimiento.power;
    const ataque = movimiento.esEspecial ? atacante.ataqueEspecial : atacante.ataque;
    const defensa = movimiento.esEspecial ? defensor.defensaEspecial : defensor.defensa;
    const efectividad = calcularEfectividad(movimiento.tipo, defensor.tipo);

    let damage = baseDamage * (ataque / defensa) * efectividad;
    return Math.floor(damage);
};

/**
 * La función `realizarAtaque` calcula y aplica daño a un Pokémon defensor en función de
 * un movimiento específico de un Pokémon atacante, reduciendo los PP del movimiento y comprobando si
 * el Pokémon defensor queda fuera de combate.
 * @param pokemonAtacante - pokemonAtacante es el Pokémon atacante que realizará el movimiento.
 * Contiene información sobre las estadísticas, nivel, tipo, etc. del Pokémon atacante.
 * @param pokemonDefensor - El parámetro `pokemonDefensor` representa el Pokémon que está siendo
 * atacado o objetivo del ataque. Contiene información sobre las estadísticas del Pokémon defensor,
 * como sus puntos de salud (hp), y el método `recibirDamage` se usa para deducir el daño
 * infligido por el ataque al defensor.
 * @param movimiento - El parámetro `movimiento` representa el movimiento o ataque que está usando el
 * Pokémon atacante. Contiene información como el nombre del movimiento, su potencia, precisión, tipo y
 * puntos de poder (PP) restantes que se pueden utilizar para realizar el movimiento.
 * @returns La función `realizarAtaque` está devolviendo un objeto con dos propiedades:
 * 1. `daño`: La cantidad de daño calculada por la función `calcularDamage`.
 * 2. `noqueado`: Un valor booleano que indica si el Pokémon defensor se ha desmayado (hp es menor o
 * igual a 0).
 */
export const realizarAtaque = (pokemonAtacante, pokemonDefensor, movimiento) => {
    if (movimiento.pp <= 0) {
        throw new Error('No hay PP suficientes para realizar el ataque');
    }
    const damage = calcularDamage(pokemonAtacante, pokemonDefensor, movimiento);
    pokemonDefensor.recibirDamage(damage);
    movimiento.pp--;

    return {
        damage,
        noqueado: pokemonDefensor.hp <= 0
    };
};

export const enviarAtaque = (batallaId, jugadorId, nombreMovimiento) => {
    const batalla = batallaService.obtenerBatalla(batallaId);
    const jugador = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
    const pokemonAtacante = jugador.getPokemonActivo();
    const movimiento = pokemonAtacante.movimientos.find(mov => mov.nombre === nombreMovimiento);

    if (!movimiento) {
        throw new Error('Movimiento no encontrado');
    }

    if (movimiento.pp <= 0) {
        throw new Error('No hay PP suficientes para realizar el ataque');
    }

    movimiento.pp--;
    return {
        pokemonAtacante,
        movimiento
    };
};


export const recibirAtaque = (pokemonDefensor, pokemonAtacante, movimiento) => {
    const damage = calcularDamage(pokemonAtacante, pokemonDefensor, movimiento);
    pokemonDefensor.recibirDamage(damage);
    return {
        damage,
        noqueado: pokemonDefensor.hp <= 0
    };
}


