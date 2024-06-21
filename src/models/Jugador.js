export class Jugador {
    constructor(nombre, pokemones) {
        if (!nombre || !pokemones || pokemones.length === 0) {
            throw new Error('El nombre y al menos un Pokémon deben estar definidos');
        }
        this.nombre = nombre;
        this.pokemones = pokemones;
        this.indicePokemonActivo = 0;
    }

    getPokemonActivo() {
        return this.pokemones.find(pokemon => !pokemon.noqueado());
    }

    cambiarPokemon() {
        for (let i = 1; i <= this.pokemones.length; i++) {
            const siguienteIndice = (this.indicePokemonActivo + i) % this.pokemones.length;
            if (!this.pokemones[siguienteIndice].noqueado()) {
                this.indicePokemonActivo = siguienteIndice;
                return this.pokemones[siguienteIndice];
            }
        }
        return null; // Todos los Pokémon están noqueados
    }

    cambiarPokemon(indice) {
        if (indice < 0 || indice >= this.pokemones.length) {
            throw new Error('Índice de Pokémon no válido');
        }
        if (this.pokemones[indice].noqueado()) {
            throw new Error('El Pokémon seleccionado está noqueado');
        }
        this.indicePokemonActivo = indice;
        return this.pokemones[indice];
    }

    pokemonesUtilizables() {
        return this.pokemones.some(pokemon => !pokemon.noqueado());
    }
}
