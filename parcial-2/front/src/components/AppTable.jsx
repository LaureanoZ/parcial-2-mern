import { useState, useEffect } from 'react';
import AppCard from './AppCard';
import './styleComponents/AppTable.css';
import projectService from "../services/project.service";
import stateService from "../services/state.service";
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

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value)
  };
  // filters
  const filterProjectsByUser = () => {
    return projects.filter(project => project.userId.includes(profile._id));
  };

  const filterProjectsByState = state => {
    return filterProjectsByUser().filter(project => project.state === state);
  };
    const filterProjectsBySearch = () => {
    return filterProjectsByUser().filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className='container-table'>
      <input
        type="text"
        placeholder='Buscar'
        value={searchQuery}
        onChange={handleSearch}
      />
      <section className="table">
        <div className="column column-pendiente">
          <div className="column-header-one">
            <h3>Pendiente</h3>
          </div>
          <div className="column-cards">
            <ul className="ul-table">
              {filterProjectsBySearch().filter(project => project.state === 'Pendiente').map(project => (
                <AppCard key={project._id} project={project} />
              ))}
            </ul>
            {searchQuery && filterProjectsBySearch().filter(project => project.state === 'Pendiente').length === 0 && (
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
              {filterProjectsBySearch().filter(project => project.state === 'En Progreso').map(project => (
                <AppCard key={project._id} project={project} />
              ))}
            </ul>
            {searchQuery && filterProjectsBySearch().filter(project => project.state === 'En Progreso').length === 0 && (
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
              {filterProjectsBySearch().filter(project => project.state === 'Hecho').map(project => (
                <AppCard key={project._id} project={project} />
              ))}
            </ul>
            {searchQuery && filterProjectsBySearch().filter(project => project.state === 'Hecho').length === 0 && (
              <p>No se encontraron proyectos hechos con el término de búsqueda.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppTable;