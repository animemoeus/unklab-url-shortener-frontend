import "animate.css";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [shortenedUrlResult, setShortenedUrlResult] = useState([
    {
      original: "https://waifu.animemoe.us",
      shortened: "http://localhost:8000/",
    }, // dummy data
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
        // append the result to array `shortenedUrlResult`
        setShortenedUrlResult((shortenedUrlResult) => [
          ...shortenedUrlResult,
          {
            original: inputUrl,
            shortened: `${props.domain}/${res.data.slug}`,
          },
        ]);
      })
      .catch((err) => {
        // error handling
        if (err.response.status === 400) {
          alert("Masukan URL yang valid!");
        } else {
          alert("Ada masalah. Coba lagi!");
        }
      })
      .finally(() => {
        // clear the input URL form
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
    <div className="min-vh-100">
      <h3 className="text-center mt-4">Unklab URL Shortener</h3>

      {/* container medium */}
      <div className="container-md px-1">
        <div className="card mt-4 mb-3 shadow">
          <div className="card-header text-center">
            <h4>Iustus Veritas Scientia</h4>
          </div>
          <div className="card-body">
            <div className="input-group mb-3 shadow-sm">
              {/* input url */}
              <input
                type="url"
                className="form-control border"
                placeholder="Masukan URL"
                value={inputUrl}
                onChange={(e) => handleInputUrl(e)}
              />
              {/* end — input url */}
              {isLoading === true && (
                <button
                  className="btn btn-outline-secondary shadow-none"
                  type="button"
                  disabled
                  onClick={handleSubmitButton}
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Submit
                </button>
              )}
              {isLoading === false && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleSubmitButton}
                >
                  Submit
                </button>
              )}
            </div>

            {/* show the shortened URL result */}
            <div className="rounded shadow-sm">
              {shortenedUrlResult.map((url, i) => {
                return (
                  <div
                    className="list-group-item animate__animated animate__fadeIn"
                    key={i}
                  >
                    <div className="row">
                      {/* original url */}
                      <div className="col-sm-6 my-1">
                        <a
                          href={url.original}
                          className="text-decoration-none text-muted"
                        >
                          {url.original}
                        </a>
                      </div>
                      {/* end — original url */}
                      {/* shortened url */}
                      <div className="col-sm-5 my-1">
                        <a
                          href={url.shortened}
                          className="text-decoration-none text-muted"
                        >
                          {url.shortened}
                        </a>
                      </div>
                      {/* end — shortened url */}
                      {/* copy button */}
                      <div className="col-sm-1 my-1">
                        <div className="d-grid">
                          <CopyToClipboard text={url.shortened}>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm shadow-none"
                            >
                              Salin
                            </button>
                          </CopyToClipboard>
                        </div>
                      </div>
                      {/* end — copy button */}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* end — show the shortened URL result */}
          </div>
        </div>
      </div>
      {/* end — container medium */}
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { domain: process.env.domain }, // will be passed to the page component as props
  };
}
