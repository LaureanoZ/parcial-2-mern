import express from 'express';
import { uploadMiddleware, uploadFile, getFiles, updateFile, deleteFile } from '../controllers/upload.api.controllers.js';

const router = express.Router();

// Subir un archivo
router.post('/upload', uploadMiddleware, uploadFile);

// Obtener un archivo
router.get('/upload', getFiles); // Cambia la ruta para indicar que devuelve múltiples archivos

// Actualizar un archivo (esto requerirá más lógica para ser completamente funcional)
router.patch('/upload/:id', updateFile);

// Eliminar un archivo
router.delete('/upload/:id', deleteFile);

export default router;

