/* La línea `import {Router} from "express";` está importando la clase `Router` del módulo "express" en
JavaScript. Esto le permite crear una nueva instancia de enrutador que puede usarse para definir
rutas para su aplicación Express. */
import { Router } from "express";
/* La línea `import { crearSala, unirseSala, crearBatalla, ataque, obtenerResumen } from
"../controller/batallaController.js";` está importando funciones específicas (`crearSala`,
`unirseSala`, `crearBatalla`, `ataque`, ` obtenerResumen`) del archivo `batallaController.js`
ubicado en el directorio `controller`. Luego, estas funciones se utilizan en el enrutador para
manejar diferentes rutas en una aplicación Express relacionadas con la creación de salas, unirse a
salas, crear batallas, realizar ataques y obtener resúmenes de batalla. */
import { crearSala, unirseSala, crearBatalla, ataque, obtenerResumen, realizarEnvioAttack, procesarAtaque,terminarBattle } from "../controller/batallaController.js";

/* `const router = Router();` está creando una nueva instancia de la clase `Router` desde el módulo
"express" en JavaScript. Esta instancia del enrutador se puede utilizar para definir rutas para la
aplicación. Le permite configurar diferentes puntos finales y manejar solicitudes HTTP para
esos puntos finales dentro de su aplicación. */
const router = Router();

/* `router.post('/sala', crearSala);` está definiendo una ruta POST en la instancia del enrutador
Express `router`. Esta ruta es accesible en el punto final `/sala` y está asociada con la función
`crearSala` importada de `batallaController.js`. Cuando se realiza una solicitud POST al punto final
`/sala`, se ejecutará la función `crearSala` para manejar la solicitud y realizar las acciones
necesarias relacionadas con la creación de una nueva sala o sala en la aplicación. */
router.post('/sala', crearSala);
/* `router.post('/sala/unirse', unirseSala);` está definiendo una ruta POST en la instancia del
enrutador Express `router`. Esta ruta es accesible en el punto final `/sala/unirse` y está asociada
con la función `unirseSala` importada de `batallaController.js`. Cuando se realiza una solicitud
POST al punto final `/sala/unirse`, se ejecutará la función `unirseSala` para manejar la solicitud y
realizar las acciones necesarias relacionadas con unirse a una sala o lobby específico en la
aplicación. */
router.post('/sala/unirse', unirseSala);
/* `router.post('/batalla', crearBatalla);` está definiendo una ruta POST en la instancia del enrutador
Express `router`. Esta ruta es accesible en el punto final `/batalla` y está asociada con la función
`crearBatalla` importada desde `batallaController.js`. Cuando se realiza una solicitud POST al punto
final `/batalla`, se ejecutará la función `crearBatalla` para manejar la solicitud y realizar las
acciones necesarias relacionadas con la creación de una batalla en la aplicación. */
router.post('/batalla', crearBatalla);
/* `router.post('/batalla/:batallaId/ataque', ataque);` está definiendo una ruta POST en la instancia
del enrutador Express `router`. Se puede acceder a esta ruta en el punto final
`/batalla/:batallaId/ataque`, donde `:batallaId` es un parámetro dinámico que se puede utilizar para
identificar una batalla específica. La ruta está asociada a la función `ataque` importada de
`batallaController.js`. Cuando se realiza una solicitud POST al punto final
`/batalla/:batallaId/ataque`, se ejecutará la función `ataque` para manejar la solicitud y realizar
acciones relacionadas con el ataque en una batalla específica dentro de la aplicación. */
router.post('/batalla/:batallaId/ataque', ataque);
/* `router.get('/batalla/:batallaId/resumen', obtenerResumen);` está definiendo una ruta GET en la
instancia del enrutador Express `router`. Se puede acceder a esta ruta en el punto final
`/batalla/:batallaId/resumen`, donde `:batallaId` es un parámetro dinámico que se puede utilizar
para identificar una batalla específica. La ruta está asociada a la función `obtenerResumen`
importada de `batallaController.js`. Cuando se realiza una solicitud GET al punto final
`/batalla/:batallaId/resumen`, se ejecutará la función `obtenerResumen` para manejar la solicitud y
realizar acciones relacionadas con la obtención de un resumen de una batalla específica dentro de la
aplicación. */
router.get('/batalla/:batallaId/resumen', obtenerResumen);

router.post('/batalla/:batallaId/procesarAtaques', procesarAtaque);
router.post('/batalla/:batallaId/ataque/envio', realizarEnvioAttack);
router.post('/batalla/:batallaId/terminar', terminarBattle);

export default router;