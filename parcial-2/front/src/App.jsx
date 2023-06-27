import { Outlet } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import AppFooter from './components/AppFooter'
import './styles/App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { SessionProvider } from './contexts/session.context'



function App() {
    return (
        <SessionProvider>
        <div className='layout-container'>
            <AppNavbar />
            <main className="main-content">
                <Outlet />
            </main>
            <AppFooter />
        </div>
        </SessionProvider>
    );
}

export default App;