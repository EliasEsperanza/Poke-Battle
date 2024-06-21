export const calcularDamage = (atacante, defensor, movimiento) => {
    const baseDamage = movimiento.power;
    const ataque = movimiento.esEspecial ? atacante.ataqueEspecial : atacante.ataque;
    const defensa = movimiento.esEspecial ? defensor.defensaEspecial : defensor.defensa;
    const damage = baseDamage * (ataque / defensa);
    return Math.floor(damage);
};

export const realizarAtaque = (pokemonAtacante, pokemonDefensor, movimiento) => {
    if (movimiento.pp <= 0) {
        throw new Error('No hay PP suficientes para realizar el ataque');
    }
    if (Math.random() * 100 > movimiento.accuracy) {
        return 0; // El movimiento falla
    }
    const damage = calcularDamage(pokemonAtacante, pokemonDefensor, movimiento);
    pokemonDefensor.recibirDamage(damage);
    movimiento.pp--;
    return damage;
};
