/* La clase `Jugador` representa un jugador con una colección de Pokémon y métodos para gestionarlos en
una batalla. */
export class Jugador {
    constructor(nombre, pokemones) {
        this.nombre = nombre;
        this.pokemones = pokemones;
        this.pokemonActivoIndex = 0;
    }

   /**
    * La función `getPokemonActivo` devuelve el Pokémon activo de una lista de Pokémon.
    * @returns La función `getPokemonActivo()` devuelve el Pokémon activo de la matriz `pokemones`
    * basada en `pokemonActivoIndex`.
    */
    getPokemonActivo() {
        const pokemonActivo = this.pokemones[this.pokemonActivoIndex];
        if (!pokemonActivo || pokemonActivo.hp <= 0) {
            throw new Error('No hay Pokémon activo o el Pokémon activo está noqueado');
        }
        return pokemonActivo;
    }

    /**
     * La función `pokemonesUtilizables` comprueba si hay algún Pokémon con HP superior a 0 disponible
     * para su uso.
     * @returns La función `pokemonesUtilizables()` devuelve un valor booleano que indica si hay al
     * menos un Pokémon en la matriz `pokemones` con HP mayor que 0.
     */
    pokemonesUtilizables() {
        return this.pokemones.some(pokemon => pokemon.hp > 0);
    }

    /**
     * La función `cambiarPokemon` itera a través de una serie de objetos Pokémon y devuelve el primero
     * con HP mayor a 0, estableciéndolo como el Pokémon activo; de lo contrario, arroja un error.
     * @returns Se está devolviendo el método `getPokemonActivo()`.
     */
    cambiarPokemon() {
        let pokemonEncontrado = false;
        for (let i = this.pokemonActivoIndex + 1; i < this.pokemones.length; i++) {
            if (this.pokemones[i].hp > 0) {
                this.pokemonActivoIndex = i;
                pokemonEncontrado = true;
                break;
            }
        }
        
        if (!pokemonEncontrado) {
            for (let i = 0; i < this.pokemonActivoIndex; i++) {
                if (this.pokemones[i].hp > 0) {
                    this.pokemonActivoIndex = i;
                    pokemonEncontrado = true;
                    break;
                }
            }
        }
        
        if (!pokemonEncontrado) {
            throw new Error('No hay más Pokémon utilizables');
        }

        return this.getPokemonActivo();
    }
}
