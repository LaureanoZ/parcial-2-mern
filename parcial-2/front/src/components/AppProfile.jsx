import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styleComponents/AppProfile.css';
import { useSession } from "../contexts/session.context"
import profileService from "../services/profile.service"
import projectService from "../services/project.service";


function AppProfile({ onClose }) {
  const { profile, onLogout } = useSession();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    avatar: profile.avatar,
    email: profile.email,
    company: profile.company,
  });
  console.log("saraza", profile);
  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la solicitud POST con los datos del formulario
      const response = await profileService.updateProfile(formData, profile._id);

      // Verifica si la solicitud fue exitosa
      if (response.status === 201) {
        // Realiza alguna acción adicional si es necesario
        console.log('Datos del perfil actualizados exitosamente');
      }
    } catch (error) {
      // Maneja el error en caso de que la solicitud falle
      console.log('Error al actualizar los datos del perfil', error);
    }

    setEditing(false);
  };

  const handleClose = () => {
    onClose();
  };

  // project
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    projectService.getAll()
      .then(data => {
        setProjects(data);
      });
  }, []);
  const filterProjectsByUser = () => {
    return projects.filter(project => project.userId.includes(profile._id));
  };

  return (
    <div className="app-profile-overlay">
      <div className="app-profile-content">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <h1 className="profile-name">{profile.name}</h1>
        <img className="img-avatar" src={profile.avatar} alt="" />
        <p className="profile-info">Email: {profile.email}</p>
        <p className="profile-info">Empresa: {profile.company}</p>
        <p className="profile-info">Proyectos: {filterProjectsByUser().length}</p>
        {filterProjectsByUser().map(project => (
          <p key={project._id}>{project.name}</p>
        ))}
        {editing ? (
          <form onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
            <input
              className="input-field"
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Foto URL"
              required
            />
            <input
              className="input-field"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Empresa"
              required
            />
            <input
              className="input-field"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {/* Agrega otros campos de datos del perfil aquí */}
            <button className="save-button" type="submit">
              Guardar
            </button>
            <button className="cancel-button" type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </form>
        ) : (
          <>
            <button className="edit-button" onClick={handleEdit}>
              Editar
            </button>
            <Link className="logout-button" onClick={onLogout}>
              Cerrar sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default AppProfile;