export class Jugador {
    constructor(nombre, pokemones) {
        this.nombre = nombre;
        this.pokemones = pokemones;
        this.pokemonActivoIndex = 0;
    }

    getPokemonActivo() {
        return this.pokemones[this.pokemonActivoIndex];
    }

    pokemonesUtilizables() {
        return this.pokemones.some(pokemon => pokemon.hp > 0);
    }

    cambiarPokemon() {
        for (let i = 0; i < this.pokemones.length; i++) {
            if (this.pokemones[i].hp > 0) {
                this.pokemonActivoIndex = i;
                return this.getPokemonActivo();
            }
        }
        throw new Error('No hay más Pokémon utilizables');
    }
}
