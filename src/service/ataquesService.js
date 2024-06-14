export const calcularDamage = (atacante, defensor,movimiento) => {
    const baseDamage = movimiento.power;
    const damage = baseDamage * (atacante.ataque / defensor.defensa);
    return Math.floor(damage);
}

export const realizarAtaque = (pokemonAtacante, pokemonDefensor, movimiento) => {
    const damage = calcularDamage(pokemonAtacante, pokemonDefensor, movimiento);
    pokemonDefensor.recibirDamage(damage);
    movimiento.pp--;
    return damage;
}