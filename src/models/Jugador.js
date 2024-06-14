export class Jugador {
    constructor(nombre, pokemones){
        this.nombre = nombre;
        this.pokemones = pokemones;
        this.indicePokemonActivo = 0;
    }

    getPokemonActivo(){
        return this.pokemones.find(pokemon => !pokemon.noqueado());
    }

    cambiarPokemon(){
        this.indicePokemonActivo++;
        if(this.indicePokemonActivo >= this.pokemones.length){
            this.indicePokemonActivo = 0;
        }
        return this.getPokemonActivo();
    }

    pokemonesUtilizables(){
        return this.pokemones.some(pokemon => !pokemon.noqueado());
    }
}