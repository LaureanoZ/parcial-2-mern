import { useState, useEffect, useRef } from 'react';
import AppCard from './AppCard';
import './styleComponents/AppTable.css';
import projectService from "../services/project.service";
import stateService from "../services/state.service";
import tagService from "../services/tag.service";
import { useSession } from "../contexts/session.context";

function AppTable() {
  // profile
  const { profile } = useSession();

  // projects
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    projectService.getAll()
      .then(data => {
        setProjects(data);
      });
  }, []);

  // states
  const [states, setStates] = useState([]);
  useEffect(() => {
    stateService.getAll()
      .then(data => {
        setStates(data);
      });
  }, []); 

  // tags
  const [tags, setTags] = useState([]);
  useEffect(() => {
    tagService.getAll()
      .then(data => {
        setTags(data);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagSelection = (tag) => {
    setSelectedTags(prevTags => [...prevTags, tag]);
  };

  const handleTagRemoval = (tag) => {
    setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
  };

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // filters
  const filterProjectsByUser = () => {
    return projects.filter(project => project.userId.includes(profile._id));
  };

  const filterProjectsByState = (state) => {
    return filterProjectsByUser().filter(project => project.state === state);
  };

  const filterProjectsBySearch = () => {
    return filterProjectsByUser().filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filterProjectsByTags = () => {
    if (selectedTags.length === 0) {
      return filterProjectsBySearch();
    }
    return filterProjectsBySearch().filter(project =>
      selectedTags.every(tag => project.tags.includes(tag))
    );
  };

  return (
    <div className='container-table'>
      <input
        type="text"
        placeholder='Buscar'
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="dropdown-container" ref={dropdownRef}>
        <div className="dropdown-select" onClick={handleDropdownToggle}>
          Tags
        </div>
        {isDropdownOpen && (
          <ul className="dropdown-options">
            {tags.map(tag => (
              <li
                key={tag._id}
                className="dropdown-option"
                onClick={() => handleTagSelection(tag.name)}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedTags.length > 0 && (
        <div className="selected-tags">
          {selectedTags.map(tag => (
            <div key={tag} className="selected-tag">
              {tag}
              <button onClick={() => handleTagRemoval(tag)}>X</button>
            </div>
          ))}
        </div>
      )}
      <section className="table">
        <div className="column column-pendiente">
          <div className="column-header-one">
            <h3>Pendiente</h3>
          </div>
          <div className="column-cards">
            <ul className="ul-table">
              {filterProjectsByTags().filter(project => project.state === 'Pendiente').map(project => (
                <AppCard key={project._id} project={project} />
              ))}
            </ul>
            {searchQuery && filterProjectsByTags().filter(project => project.state === 'Pendiente').length === 0 && (
              <p>No se encontraron proyectos pendientes con el término de búsqueda.</p>
            )}
          </div>
        </div>
        <div className="column column-enprogreso">
          <div className="column-header-two">
            <h3>En Progreso</h3>
          </div>
          <div className="column-cards">
            <ul className="ul-table">
              {filterProjectsByTags().filter(project => project.state === 'En Progreso').map(project => (
                <AppCard key={project._id} project={project} />
              ))}
            </ul>
            {searchQuery && filterProjectsByTags().filter(project => project.state === 'En Progreso').length === 0 && (
              <p>No se encontraron proyectos en progreso con el término de búsqueda.</p>
            )}
          </div>
        </div>
        <div className="column column-hecho">
          <div className="column-header-three">
            <h3>Hecho</h3>
          </div>
          <div className="column-cards">
            <ul className="ul-table">
              {filterProjectsByTags().filter(project => project.state === 'Hecho').map(project => (
                <AppCard key={project._id} project={project} />
              ))}
            </ul>
            {searchQuery && filterProjectsByTags().filter(project => project.state === 'Hecho').length === 0 && (
              <p>No se encontraron proyectos hechos con el término de búsqueda.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppTable;