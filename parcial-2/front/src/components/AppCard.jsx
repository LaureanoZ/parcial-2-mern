import PropTypes from 'prop-types';
import './styleComponents/AppCard.css';
import { Link } from 'react-router-dom';


function AppCard({ project }) {
    const tagsColors = ['#FFC107', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0'];
  
    return (
      <li className="card">
        <h3>{project.name}</h3>
        <p>Descripcion: {project.description}</p>
        <p>Comentarios: {project.comment}</p>
        <div className="tag-container">
          {project.tags.map((tags, index) => (
            <span key={tags} style={{ backgroundColor: tagsColors[index % tagsColors.length] }}>
              {tags}
            </span>
          ))}
        </div>
        <div className="user-container">

          <span className="user-span">
            Usuario: {project.user}
          </span>

      </div>
      <Link className="link-button" to={`${project._id}`}>Detalle</Link>
      </li>
    );
  }

AppCard.propTypes = {
  project: PropTypes.object.isRequired
}

export default AppCard