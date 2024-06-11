import React, { useState, useEffect } from 'react';
import './styleComponents/AppUpload.css';
import { useSession } from "../contexts/session.context";
import { getAll, createUpload, deleteUpload } from '../services/upload.service.js';

function AppUpload() {
  const { profile } = useSession();
  const [file, setFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [currentImageId, setCurrentImageId] = useState('');

  useEffect(() => {
    getAll().then(response => {
      const userImages = response.filter(upload => upload.userId === profile._id);
      if (userImages.length > 0) {
        const latestImage = userImages[userImages.length - 1];
        setProfileImageUrl(`http://localhost:2222/uploads/${latestImage.filename}`);
        setCurrentImageId(latestImage._id);
      } else {
        // No hay imágenes, establece la URL de la imagen de perfil como vacía
        setProfileImageUrl('');
      }
    }).catch(error => {
      console.error('Error al obtener las imágenes', error);
    });
  }, [profile._id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Por favor, selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('myFile', file);
    formData.append('userId', profile._id);

    try {
      if (currentImageId) {
        await deleteUpload(currentImageId);
      }

      const uploadResponse = await createUpload(formData);
      alert('Archivo subido con éxito.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Hubo un error al subir el archivo.');
    }
  };

  return (
    <div className="app-upload">
      <form onSubmit={handleSubmit} className="app-upload-form">
        {profileImageUrl 
          ? <img width={100} src={profileImageUrl} alt="Profile" />
          : <p>No tiene imagen de perfil.</p>
        }
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir Archivo</button>
      </form>
    </div>
  );
}

export default AppUpload;
