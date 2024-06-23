import { Router } from "express";
import { crearSala, unirseSala, crearBatalla, ataque, obtenerResumen } from "../controller/batallaController.js";

const router = Router();

router.post('/sala', crearSala);
router.post('/sala/unirse', unirseSala);
router.post('/batalla', crearBatalla);
router.post('/batalla/:batallaId/ataque', ataque);
router.get('/batalla/:batallaId/resumen', obtenerResumen);

export default router;