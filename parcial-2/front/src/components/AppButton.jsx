import { useState, useEffect } from 'react';
import './styleComponents/AppButton.css';
import { createProject } from "../services/project.service";
import { useSession } from "../contexts/session.context";
import tagService from "../services/tag.service";

const AppButton = () => {
  const { profile } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    comment: '',
    state: '',
    user: '',
    tags: [],
    userId: '',
  });
console.log(profile)
  useEffect(() => {
    if (profile._id) {
      setProjectData((prevData) => ({
        ...prevData,
        userId: profile._id,
        user: profile.name
      }));
    }
  }, [profile._id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
      setProjectData((prevData) => ({
        ...prevData,
        [name]: selectedTags,
      }));
    } else {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProject(projectData);
      console.log('Proyecto creado:', response);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  // tags
  const [tags, setTags] = useState([]);

  useEffect(() => {
    tagService.getAll()
      .then(data => {
        setTags(data);
      });
  }, []);


  return (
    <>
      <button className="add-project-button" onClick={showModal}>
        Agregar Proyecto
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agregar Proyecto</h2>
            <form className="project-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">Nombre del Proyecto:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={projectData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-field">
                <label htmlFor="comment">Comentario:</label>
                <input
                  type="text"
                  id="comment"
                  name="comment"
                  value={projectData.comment}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="state">Estado:</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={projectData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="tags">Tags:</label>
                <select
                  id="tags"
                  name="tags"
                  value={projectData.tags}
                  onChange={handleChange}
                  required
                  multiple
                >
                  {tags.map((tag) => (
                    <option key={tag._id} value={tag.name}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button className="cancel-button" type="button" onClick={handleCancel}>
                  Cancelar
                </button>
                <button className="submit-button" type="submit">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AppButton;