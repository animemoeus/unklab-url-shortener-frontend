// import cookie from "cookie";
import Navbar from "../components/molecules/Navbar";


import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// import Shortener from "../components/organisms/Shortener";
// import HeroImage from "../components/molecules/HeroImage";

export default function Home(props) {
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedLink, setShortenedLink] = useState([]);

  const handleSubmitButton = (button) => {
    setIsLoading(true);

    // inputUrl cannot be empty
    if (inputUrl.length <= 0) {
      alert("Masukan link!");
      setIsLoading(false);
      return;
    }

    // API calling
    const formdata = new FormData();
    formdata.append("target_url", inputUrl);
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://uus.animemoe.us/api/shorten/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if ("slug" in result) {
          // append the result to array `shortenedLink`
          setShortenedLink((shortenedLink) => [
            ...shortenedLink,
            {
              original: inputUrl,
              result: `${process.env.domain}/${result.slug}`,
            },
          ]);
        } else {
          alert("Link yang dimasukkan tidak valid.");
        }
      })
      .catch((error) => {
        alert("Sedang ada masalah. Coba lagi nanti.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-vh-100 ">
      <Navbar />


      {/* start URL shortener */}
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          minHeight: "33rem",
          backgroundImage: `url(https://cdn.discordapp.com/attachments/858938620425404426/966036902702641232/bg-masthead.jpg)`,
          backrepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container-md" style={{ marginTop: "0rem" }}>
          <h1 className="text-center text-white mb-4 animate__animated animate__fadeInDown">
            Penyingkat Tautan Universitas Klabat
          </h1>
          <div className="row">
            <div className="col-md-8 p-1 animate__animated animate__fadeInLeft">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukan Link..."
                  onChange={(e) => setInputUrl(e.target.value)}
                  value={inputUrl}

                />
              </div>
            </div>
            <div className="col-md-4 p-1 animate__animated animate__fadeInRight">
              <div className="input-group input-group-lg">
                {isLoading === true && (
                  <button
                    type="button"
                    className="btn btn-primary w-100 disabled"
                  >
                    Sabar...
                  </button>
                )}
                {isLoading === false && (
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleSubmitButton}
                  >
                    Singkatkan!
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end URL shortener */}

      {/* result */}
      <div className="container-fluid border">
        <div className="p-1 m-3 mb-3">
          <div
            className="row bg-white rounded shadow"
            style={{ marginTop: "-10rem" }}
          >
            {/* shortener link result */}
            {shortenedLink.length > 0 && (
              <div className="rounded py-1 px-1">
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
        {/* end result */}
        <div className="row">
          <div className="col-md-4 p-3">
            <div className="border rounded shadow p-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                rerum ipsam omnis. Assumenda molestias cupiditate nisi
                recusandae, quibusdam ut nesciunt at quae. Eaque nulla provident
                soluta harum laudantium, deleniti excepturi?
              </p>
            </div>
          </div>
          <div className="col-md-4 p-3">
            <div className="border rounded shadow p-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                rerum ipsam omnis. Assumenda molestias cupiditate nisi
                recusandae, quibusdam ut nesciunt at quae. Eaque nulla provident
                soluta harum laudantium, deleniti excepturi?
              </p>
            </div>
          </div>
          <div className="col-md-4 p-3">
            <div className="border rounded shadow p-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                rerum ipsam omnis. Assumenda molestias cupiditate nisi
                recusandae, quibusdam ut nesciunt at quae. Eaque nulla provident
                soluta harum laudantium, deleniti excepturi?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = {};

  return { props: { data } };
}
