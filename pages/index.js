import { CopyToClipboard } from "react-copy-to-clipboard";

import Navbar from "../components/molecules/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <hr />
      <hr />

      <div className="border mt-2">
        <section className="jumbotron shadow text-center">
          <img src="/img/logo.png" alt="..." width="400" />
          <div className="card shadow  textjudul animate__animated animate__backInUp text-center">
            <h1>Unklab Shortener Link</h1>
          </div>
        </section>
      </div>
      <div className="border mt-3">
        <div className="container mt-3 shadow ">
          <div className="row g-0">
            <div className="col-sm-6 col-md-8">
              <label htmlFor="inputPassword2" className="visually-hidden">
                Masukan link
              </label>
              <input
                type="text"
                className="form-control forminput"
                id="inputPassword2"
                placeholder="Enter Your Link"
              />
            </div>
            <div className="col-6 col-md-4">
              <div>
                <input
                  className="btn buttonshort"
                  type="submit"
                  value="Shorted Link"
                />
              </div>
            </div>
          </div>
          <div className="row g-0 mt-4 mb-4">
            <div className="col-sm-6 col-md-8">
              <div>
                <label htmlFor="staticEmail2" className="visually-hidden">
                  Email
                </label>
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext copy"
                  id="staticEmail2"
                  value="email@example.com"
                />
              </div>
            </div>
            <div className="col-6 col-md-4">
              <CopyToClipboard text="email@example.com">
                <button className="btn buttonshort" type="submit">
                  Copy to clipboard
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
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
