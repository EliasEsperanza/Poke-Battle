import { Router } from "express";
import { crearBatalla, ataque } from "../controller/batallaController.js";

const router = Router();

router.post('/batalla', crearBatalla);
router.post('/batalla/:batallaId/ataque', ataque);

export default router;