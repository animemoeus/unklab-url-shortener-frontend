import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

import Navbar from "../components/molecules/Navbar";

export default function Home() {
  // default state
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedLink, setShortenedLink] = useState([
    // { original: "https://animemoe.us", result: "https://animemoe.us" },
    // { original: "https://animemoe.us", result: "https://animemoe.us" },
  ]);

  // submit button onClick
  const handleSubmitButton = () => {
    setIsLoading(!isLoading);

    // API calling using POST method
    axios
      .post(
        "https://uus.animemoe.us/api/shorten/",
        {
          target_url: inputUrl,
        } // body data
      )
      .then((res) => {
        // append the result to array `shortenedLink`
        setShortenedLink((shortenedUrlResult) => [
          ...shortenedLink,
          {
            original: inputUrl,
            result: `${process.env.domain}/${res.data.slug}`,
          },
        ]);
      })
      .catch((err) => {
        // error handling
        console.log(err);
        if (err.response.status === 400) {
          alert("Masukan URL yang valid!");
        } else {
          alert("Ada masalah. Coba lagi!");
        }
      })
      .finally(() => {
        // clear the input from URL form
        setInputUrl("");

        // disable button loading animation at the end of API call
        setIsLoading(false);
      });
  };

  // input url onChange
  const handleInputUrl = (e) => {
    setInputUrl(e.target.value);
  };

  return (
    <div>
      <Navbar />

      {/* Hero Image */}
      <div className="shadow-sm">
        <section className="text-center pb-3">
          <img src="/img/logo-unklab.png" alt="..." className="hero-image" />

          <h1>Unklab Shortener Link</h1>
        </section>
      </div>
      {/* End — Hero Image */}

      {/* Short Link */}
      <div className="p-2 mt-1">
        <div className="border rounded container-md shadow-sm my-2 py-2">
          <div className="row">
            <div className="col-sm-10 my-1">
              {/* input text from user */}
              <input
                type="text"
                className="form-control"
                value={inputUrl}
                onChange={(e) => handleInputUrl(e)}
              />
              {/* End — input text from user */}
            </div>
            <div className="col-sm-2 my-1">
              <div className="d-grid gap-2">
                {isLoading === true && (
                  <button
                    className="btn btn-blue text-white"
                    type="button"
                    onClick={handleSubmitButton}
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    Loading...
                  </button>
                )}
                {isLoading === false && (
                  <button
                    className="btn btn-blue text-white"
                    type="button"
                    onClick={handleSubmitButton}
                  >
                    Shorten
                  </button>
                )}
              </div>
            </div>
            {/* Result */}
            <div className="rounded mt-2">
              {shortenedLink.map((e, i) => {
                return (
                  <div
                    className="list-group-item  animate__animated animate__fadeIn"
                    key={i}
                  >
                    <div className="row">
                      {/* original url */}
                      <div className="col-sm-6 my-1">
                        <a
                          href={e.original}
                          className="text-decoration-none text-muted"
                        >
                          {e.original}
                        </a>
                      </div>
                      {/* End — original url */}
                      {/* result url */}
                      <div className="col-sm-5 my-1">
                        <a
                          href={e.result}
                          className="text-decoration-none text-muted"
                        >
                          {e.result}
                        </a>
                      </div>
                      {/* End — result url */}
                      {/* copy button */}
                      <div className="col-sm-1 my-1">
                        <div className="d-grid">
                          <CopyToClipboard text={e.result}>
                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm shadow-none"
                            >
                              Copy
                            </button>
                          </CopyToClipboard>
                        </div>
                      </div>
                      {/* End — copy button */}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* End — Result */}
          </div>
        </div>
      </div>
      {/* End — Short Link */}
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
