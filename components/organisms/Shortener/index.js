import axios from "axios";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function Shortener() {
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedLink, setShortenedLink] = useState([]);

  // submit button onClick
  const handleSubmitButton = () => {
    // enable button loading animation
    setIsLoading(!isLoading);

    const apiEndpoint = `${process.env.apiEndpoint}`; // get API endpoint from NextJs env variable
    const payload = {
      target_url: inputUrl,
    }; // POST body data

    // API calling using POST method
    axios
      .post(apiEndpoint, payload)
      .then((res) => {
        // append the result to array `shortenedLink`
        setShortenedLink((shortenedLink) => [
          ...shortenedLink,
          {
            original: inputUrl,
            result: `${process.env.domain}/${res.data.slug}`,
          },
        ]);
      })
      .catch((err) => {
        // error handling
        // send alert to user
        if (err.response.status === 400) {
          alert("Enter a valid URL!");
        } else {
          alert("There is a problem. Try again!");
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
    <div className="p-2 bg-purple">
      <div className="border rounded container-md bg-white shadow-sm my-2 py-2">
        <div className="row">
          {/* input text from user */}
          <div className="col-sm-10 my-1">
            <input
              type="text"
              className="form-control"
              value={inputUrl}
              onChange={(e) => handleInputUrl(e)}
            />
          </div>
          {/* end — input text from user */}
          {/* submit button */}
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
          {/* end — submit button */}

          {/* shortener link result */}
          {shortenedLink.length > 0 && (
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
                      {/* end — original url */}
                      {/* result url */}
                      <div className="col-sm-5 my-1">
                        <a
                          href={e.result}
                          className="text-decoration-none text-muted"
                        >
                          {e.result}
                        </a>
                      </div>
                      {/* end — result url */}
                      {/* copy button */}
                      <div className="col-sm-1 my-1">
                        <div className="d-grid">
                          <CopyToClipboard text={e.result}>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm shadow-none"
                            >
                              Copy
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
          )}
          {/* end —  shortener link result */}
        </div>
      </div>
    </div>
  );
}
