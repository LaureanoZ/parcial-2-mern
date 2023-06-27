import './styleComponents/AppFooter.css';
function AppFooter() {


    return (
        <footer className="footer">
            <div className="footer-logo">Brian Trello</div>
            <div className="footer-social-icons">
                <a href="https://www.instagram.com">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.github.com">
                    <i className="fab fa-github"></i>
                </a>
            </div>
            <div className="footer-developed-by">
                Desarrollado por Laureano Zalazar
            </div>
        </footer>
    )
}
export default AppFooter