export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-orange shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Unklab URL Shortener
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <a className="nav-link active" href="#">
              About
            </a>
            <a className="nav-link" href="#">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
