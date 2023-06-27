import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import projectService from '../services/project.service';
import { editProject, deleteProject } from "../services/project.service";
import tagService from "../services/tag.service";

import './stylesPages/ProjectDetailsPage.css';

function ProjectDetailsPage() {
  const { idProject } = useParams();
  const [project, setProjects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editedProject, setEditedProject] = useState({
    name: '',
    description: '',
    comment: '',
    tags: [],
    state: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    projectService.getById(idProject).then(data => {
      setProjects(data);
      setEditedProject(data);
    });
  }, []);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    if (name === 'tags') {
      const selectedTags = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setEditedProject((prevState) => ({
        ...prevState,
        [name]: selectedTags,
      }));
    } else {
      setEditedProject((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editProject(idProject, editedProject).then(data => {
      console.log('Proyecto editado:', data);
      closeEditModal();
    });
  };

  const handleDeleteConfirm = () => {
    deleteProject(idProject).then(data => {
      console.log('Proyecto eliminado:', data);
      closeDeleteConfirmation();
      navigate('/', { replace: true });
    });
  };
  const [tags, setTags] = useState([]);

  useEffect(() => {
    tagService.getAll()
      .then(data => {
        setTags(data);
      });
  }, []);

  const tagsColors = ['#FFC107', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0'];

  return (
    <div className="project-details">
      <div className="project-details-header">
        <h2>Detalles del Proyecto</h2>
        <Link to="/" className="back-link">Volver</Link>
      </div>
      <div className="project-details-content">
        <div className="project-details-card">
          <h3>{project.name}</h3>
          <p>Descripción: {project.description}</p>
          <p>Comentario: {project.comment}</p>
        </div>
        <div className="project-details-tags">
          <h4>Tags:</h4>
          <div className="tag-container">
            {project.tags?.map((tag, index) => (
              <span key={index} className="tag" style={{ backgroundColor: tagsColors[index % tagsColors.length] }}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="project-details-users">
          <h4>Usuarios:</h4>
          <div className="user-container">
            <span className="user">{project.user}</span>
          </div>
        </div>
      </div>
      <div className="modal-buttons">
        <button className="modal-buttons-edit" onClick={openEditModal}>Editar</button>
        <button className="modal-buttons-delete" onClick={openDeleteConfirmation}>Eliminar</button>
      </div>

      {/* Modal de Edición */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Proyecto</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={editedProject.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Descripción:
                <textarea
                  name="description"
                  value={editedProject.description}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <label>
                Comentario:
                <textarea
                  name="comment"
                  value={editedProject.comment}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <div className="form-field">
                <label htmlFor="tags">Tags:</label>
                <select
                  id="tags"
                  name="tags"
                  value={editedProject.tags}
                  onChange={handleInputChange}
                  required
                  multiple
                >
                  {tags.map((tags) => (
                    <option key={tags._id} value={tags.name}>
                      {tags.name}
                    </option>
                  ))}
                </select>
              </div>
              <label>
                Estado:
                <select
                  name="state"
                  value={editedProject.state}
                  onChange={handleInputChange}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Progreso">En Progreso</option>
                  <option value="Hecho">Hecho</option>
                </select>
              </label>
              <div>
                <button className="modal-buttons-edit" type="submit">Guardar</button>
                <button className="modal-buttons-delete" onClick={closeEditModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar el proyecto?</p>
            <div className="modal-buttons">
              <button className="modal-buttons-delete" onClick={handleDeleteConfirm}>Eliminar</button>
              <button className="modal-buttons-edit" onClick={closeDeleteConfirmation}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetailsPage;