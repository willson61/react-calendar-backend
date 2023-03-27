// Rutas de Eventos
// host + /api/events

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/fieldValidator');
const { validarJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.use( validarJWT );

// Obtener Eventos
router.get('/', [], getEventos);

// Crear nuevo evento
router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

// Actualizar Evento
router.put('/:id', [  ], actualizarEvento);

// Eliminar Evento
router.delete('/:id', [  ], eliminarEvento);

module.exports = router;