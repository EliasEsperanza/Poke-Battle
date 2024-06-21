import { batallaService } from "../service/batallaService.js";
import { Jugador } from "../models/Jugador.js";
import { Pokemon } from "../models/Pokemon.js";

export const crearBatalla = (req, res) => {
    const { nombreJugador1, pokemonesJugador1, nombreJugador2, pokemonesJugador2 } = req.body;

    try {
        const jugador1 = new Jugador(nombreJugador1, pokemonesJugador1.map(pokemon => new Pokemon(pokemon.id, pokemon.nombre, pokemon.hp, pokemon.ataque, pokemon.defensa, pokemon.ataqueEspecial, pokemon.defensaEspecial, pokemon.movimientos)));
        const jugador2 = new Jugador(nombreJugador2, pokemonesJugador2.map(pokemon => new Pokemon(pokemon.id, pokemon.nombre, pokemon.hp, pokemon.ataque, pokemon.defensa, pokemon.ataqueEspecial, pokemon.defensaEspecial, pokemon.movimientos)));

        const batallaId = batallaService.crearBatalla(jugador1, jugador2);
        res.json({ message: 'Batalla creada', batallaId });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const ataque = (req, res) => {
    const { batallaId } = req.params;
    const { jugadorId, nombreMovimiento } = req.body;

    try {
        const resultado = batallaService.ataque(batallaId, jugadorId, nombreMovimiento);
        res.json({ message: 'Ataque realizado', resultado });

        if (resultado.defensor.noqueado()) {
            res.json({ message: 'Batalla finalizada', ganador: resultado.atacante });
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};
