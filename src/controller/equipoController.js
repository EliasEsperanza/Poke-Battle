import { obtenerMovimientos, verEquipo, vidaPokemonActivo, cambiarPokemon } from "../service/equipoService.js";

export const obtenerMovimientosController = (req, res) => {
    const { batallaId, jugadorId } = req.params;
    const movimientos = obtenerMovimientos(batallaId, jugadorId);
    res.json(movimientos);
}

export const verEquipoController = (req, res) => {
    const { batallaId, jugadorId } = req.params;
    const equipo = verEquipo(batallaId, jugadorId);
    res.json(equipo);
}

export const vidaPokemonActivoController = (req, res) => {
    const { batallaId, jugadorId } = req.params;
    const vida = vidaPokemonActivo(batallaId, jugadorId);
    res.json(vida);
}

export const cambiarPokemonController = (req, res) => {
    const { batallaId, jugadorId } = req.params;
    const { indice } = req.body;

    try {
        const nuevoPokemon = cambiarPokemon(batallaId, jugadorId, indice);
        res.json(nuevoPokemon);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}
