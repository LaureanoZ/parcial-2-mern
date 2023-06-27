import './stylesPages/ProjectPage.css'
import AppTable from '../components/AppTable'
import AppButton from '../components/AppButton'


function ProjectPage() {
    return (
      <div className="project-page">
        <h2 className="project-page-title">Bienvenido a Brian Trello</h2>
        <p className="project-page-description">¡Aquí podrás ver y organizar todos tus proyectos!</p>
        <AppButton></AppButton>
        <AppTable></AppTable>
      </div>
    );
  }

export default ProjectPage