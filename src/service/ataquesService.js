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

const precisionAtaque = (accuracy) => {
    return Math.random() * 100 <= accuracy;
};

const calcularEfectividad = (tipoAtaque, tipoDefensor) => {
    if (efectividadTipo[tipoAtaque] && efectividadTipo[tipoAtaque][tipoDefensor] !== undefined) {
        return efectividadTipo[tipoAtaque][tipoDefensor];
    }
    return 1; // Efectividad neutral si no se encuentra en la tabla
};

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