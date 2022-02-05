export default function Navbar() {
  return (
    <nav className="navbar background fixed-top navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand textNav" href="#">
          Unklab Shortener Link
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navset" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active textNav "
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link textNav" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link textNav" href="/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
