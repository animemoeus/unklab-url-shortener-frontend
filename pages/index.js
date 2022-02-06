import Navbar from "../components/molecules/Navbar";
import Shortener from "../components/organisms/Shortener";
import HeroImage from "../components/molecules/HeroImage";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroImage />
      <Shortener />

      <div>
        <div className="container-fluid text-center">
          <div className="row">
            <div className="col-sm-12">
              <div className="card text-center">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" href="#">
                        Sign Up
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        login
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
