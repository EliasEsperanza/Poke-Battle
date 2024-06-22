const efectividadTipo ={
    'normal': {'lucha': 2, 'fantasma': 0},
    'fuego': {'agua': 0.5, 'planta': 2, 'hierro': 0.5, 'bicho': 2, 'hada': 2, 'hielo': 2},
    'agua': {'fuego': 2, 'planta': 0.5, 'tierra': 2, 'roca': 2},
    'planta': {'agua': 2, 'fuego': 0.5, 'tierra': 0.5, 'roca': 2, 'volador': 2, 'bicho': 2},
    'electrico': {'agua': 2, 'volador': 0.5, 'tierra': 0},
    'hielo': {'planta': 2, 'tierra': 2, 'volador': 2, 'dragon': 2},
    'lucha': {'normal': 0.5, 'hielo': 2, 'roca': 0.5, 'siniestro': 2, 'volador': 0.5, 'psiquico': 0.5, 'bicho': 0.5, 'hada': 2, 'veneno': 0.5},
    'veneno': {'planta': 2, 'hada': 2, 'lucha': 2, 'bicho': 2, 'veneno': 0.5, 'psiquico': 0.5},
    'tierra': {'fuego': 2, 'electrico': 2, 'roca': 2, 'acero': 2, 'veneno': 0.5, 'planta': 2},
    'volador': {'planta': 0.5, 'lucha': 2, 'bicho': 0.5, 'electrico': 2, 'hielo': 0.5, 'roca': 2},
    'psiquico': {'lucha': 2, 'veneno': 2, 'psiquico': 0.5, 'siniestro': 0},
    'bicho': {'planta': 0.5, 'psiquico': 2, 'lucha': 0.5, 'volador': 2, 'siniestro': 2, 'fuego': 0.5, 'fantasma': 0.5},
    'roca': {'fuego': 2, 'hielo': 2, 'volador': 0.5, 'bicho': 2, 'lucha': 2},
    'fantasma': {'fantasma': 2, 'psiquico': 2, 'normal': 0},
    'dragon': {'dragon': 2},
    'acero': {'roca': 0.5, 'hielo': 0.5, 'hada': 2, 'acero': 0.5, 'planta': 0.5, 'bicho': 0.5, 'volador': 0.5, 'normal': 0.5, 'veneno': 0},
    'siniestro': {'fantasma': 2, 'psiquico': 2, 'lucha': 0.5, 'siniestro': 0.5, 'hada': 2},
    'hada': {'lucha': 0.5, 'dragon': 0, 'siniestro': 0.5, 'acero': 0.5, 'fuego': 0.5}
}

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