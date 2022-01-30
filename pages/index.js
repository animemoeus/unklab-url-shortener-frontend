import { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [shortenedUrlResult, setShortenedUrlResult] = useState([
    "https://waifu.animemoe.us",
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
          `http://localhost:3000/${res.data.slug}`,
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
        <div className="card mt-4">
          <div className="card-header text-center">
            <h4>Iustus Veritas Scientia</h4>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <input
                type="url"
                className="form-control border"
                placeholder="Masukan URL"
                value={inputUrl}
                onChange={(e) => handleInputUrl(e)}
              />
              {isLoading === true && (
                <button
                  className="btn btn-outline-secondary"
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

            <hr className="m-0" />

            {/* show the shortened URL result */}
            <ul className="list-group list-group-flush">
              {shortenedUrlResult.map((url, i) => {
                return (
                  <li className="list-group-item" key={i}>
                    <CopyToClipboard text={url}>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Salin
                      </button>
                    </CopyToClipboard>{" "}
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        value={url}
                        onChange={(e) => {}}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* end — show the shortened URL result */}
          </div>
        </div>
      </div>
      {/* end — container medium */}
    </div>
  );
}
