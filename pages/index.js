import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Home() {
  return (
    <div>
      <nav className="navbar background fixed-top navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Unklab Shortener Link
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navset" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mid mt-4">
        <div className="row">
          <div className="col">
            <section className="jumbotron text-center">
              <img src="/img/logo.png" alt="..." width="400" />
              <div className="textjudul animate__animated animate__backInUp text-center">
                <h1>Unklab Shortener Link</h1>
              </div>
            </section>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="gold"
            fill-opacity="1"
            d="M0,160L60,181.3C120,203,240,245,360,245.3C480,245,600,203,720,192C840,181,960,203,1080,202.7C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div>
        <div className="search animate__animated animate__flipInX">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 ">
              <div className="mt-2 mb-2">
                <div>
                  <script src="copytext/index.js"></script>
                  <label for="inputPassword2" className="visually-hidden">
                    Masukan link
                  </label>
                  <input type="text" className="form-control" id="inputPassword2" placeholder="Enter Your Link" />
                </div>
                <div className="col-auto position-relative mt-3">
                  <input class="btn btn-primary" type="submit" value="Shorted Link" />
                </div>
                <div className="col-auto">
                  <label for="staticEmail2" className="visually-hidden">
                    Email
                  </label>
                  <input type="text" readonly className="form-control-plaintext copy mt-3 p-3" id="staticEmail2" value="email@example.com" />
                </div>
                <CopyToClipboard text="email@example.com">
                  <button>Copy to clipboard with button</button>
                </CopyToClipboard>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
