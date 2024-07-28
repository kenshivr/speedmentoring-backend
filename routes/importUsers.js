const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { importUsers } = require('../controllers/importUsers');

// Configuración de multer para almacenamiento temporal
const upload = multer({
  dest: 'uploads/', // Carpeta donde se guardarán los archivos temporalmente
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.csv') {
      return cb(new Error('Solo se permiten archivos CSV'), false);
    }
    cb(null, true);
  },
});

// Ruta para importar usuarios
router.post('/importUsers', upload.single('file'), importUsers);

module.exports = router;
