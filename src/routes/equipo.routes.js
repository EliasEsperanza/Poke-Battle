import { Router } from "express";
import { obtenerMovimientosController, verEquipoController, vidaPokemonActivoController, cambiarPokemonController } from "../controller/equipoController.js";

const router = Router();

router.get('/batalla/:batallaId/jugador/:jugadorId/movimientos', obtenerMovimientosController);
router.get('/batalla/:batallaId/jugador/:jugadorId/equipo', verEquipoController);
router.get('/batalla/:batallaId/jugador/:jugadorId/pokemon-activo/vida', vidaPokemonActivoController);
router.post('/batalla/:batallaId/jugador/:jugadorId/cambiar-pokemon', cambiarPokemonController);

export default router;