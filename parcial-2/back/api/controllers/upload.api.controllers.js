import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getUpload, createUpload, editUpload, deleteUpload } from '../../services/upload.services.js'; // Asegúrate de actualizar la ruta
import { ObjectId } from 'mongodb';

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
const uploadMiddleware = upload.single('myFile');

// Controladores CRUD
const uploadFile = async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ error: 'No se ha enviado ningún archivo.' });
    }
  
    // Este es el lugar donde podrías validar el userId
    const userId = req.body.userId;
    if (!userId || (typeof userId !== 'string') || userId.length !== 24) {
      return res.status(400).send({ error: 'ID de usuario no válido o no proporcionado.' });
    }
  
    const fileData = {
      userId: userId, // Solo crea el ObjectId si el userId es válido
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    };
  
    try {
      const createdUpload = await createUpload(fileData);
      res.status(201).send({ message: 'Archivo enviado con éxito.', upload: createdUpload });
    } catch (err) {
      // Asegúrate de manejar cualquier error aquí
      res.status(500).send({ message: "No se pudo guardar la información del archivo en la base de datos.", error: err });
    }
  };
  
  

const getFiles = async (req, res) => {
    try {
      const uploads = await getUpload(); // Sin filtro para obtener todos los documentos
      if (!uploads || uploads.length === 0) {
        return res.status(404).send({ message: 'No se encontraron archivos.' });
      }
  
      // Opción 1: Enviar los metadatos de los archivos
      res.send(uploads);
  
      // Opción 2: Si deseas enviar las imágenes como archivos (sería ineficiente para muchas imágenes)
      // const filesToSend = uploads.map(upload => path.join(__dirname, '..', 'uploads', upload.filename));
      // res.send(filesToSend);
  
    } catch (err) {
      res.status(500).send({ message: "No se pudieron obtener los archivos. " + err });
    }
  };
  

const updateFile = async (req, res) => {
  const fileId = req.params.id;
  const fileData = req.body;

  try {
    const updatedUpload = await editUpload(fileId, fileData);
    res.send({ message: 'Archivo actualizado con éxito.', upload: updatedUpload });
  } catch (err) {
    res.status(500).send({ message: "No se pudo actualizar la información del archivo. " + err });
  }
};

const deleteFile = async (req, res) => {
    const fileId = req.params.id;
  
    try {
      const uploads = await getUpload({ _id: new ObjectId(fileId) });
      // Como getUpload devuelve un array, verifica si hay algún elemento
      if (uploads.length === 0) {
        return res.status(404).send({ message: 'Archivo no encontrado.' });
      }
      
      // Obtén el primer elemento del array que contiene los datos del archivo
      const upload = uploads[0];
      
      // Eliminar archivo del sistema de archivos
      const filePath = path.join('uploads', upload.filename);
      fs.unlink(filePath, async (err) => {
        if (err) {
          // Si hay un error al eliminar el archivo del sistema de archivos, envía una respuesta de error
          return res.status(500).send({ message: "No se pudo eliminar el archivo del sistema de archivos. " + err });
        }
        
        // Si el archivo del sistema de archivos se elimina con éxito, procede a eliminar el registro de la base de datos
        await deleteUpload(fileId);
        res.send({ message: 'Archivo eliminado con éxito.' });
      });
    } catch (err) {
      res.status(500).send({ message: "No se pudo eliminar el archivo. " + err });
    }
  };

export {
  uploadFile,
  uploadMiddleware,
  getFiles,
  updateFile,
  deleteFile
};
