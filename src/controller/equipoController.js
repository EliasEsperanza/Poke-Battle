import { obtenerMovimientos, verEquipo, vidaPokemonActivo, cambiarPokemon } from "../service/equipoService.js";

export const obtenerMovimientosController = (req, res, next) => {
    const { batallaId, jugadorId } = req.params;
    try {
        const movimientos = obtenerMovimientos(batallaId, jugadorId);
        res.json(movimientos);
    } catch (e) {
        next(e);
    }
};

export const verEquipoController = (req, res, next) => {
    const { batallaId, jugadorId } = req.params;
    try {
        const equipo = verEquipo(batallaId, jugadorId);
        res.json(equipo);
    } catch (e) {
        next(e);
    }
};

export const vidaPokemonActivoController = (req, res, next) => {
    const { batallaId, jugadorId } = req.params;
    try {
        const vida = vidaPokemonActivo(batallaId, jugadorId);
        res.json(vida);
    } catch (e) {
        next(e);
    }
};

export const cambiarPokemonController = (req, res, next) => {
    const { batallaId, jugadorId } = req.params;
    const { indice } = req.body;

    if (typeof indice !== 'number') {
        return res.status(400).json({ message: 'Índice inválido' });
    }

    try {
        const nuevoPokemon = cambiarPokemon(batallaId, jugadorId, indice);
        res.json(nuevoPokemon);
    } catch (e) {
        next(e);
    }
};

