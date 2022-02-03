import "animate.css";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [shortenedUrlResult, setShortenedUrlResult] = useState([
    // {
    //   original: "https://waifu.animemoe.us",
    //   shortened: "http://localhost:8000/",
    // }, // dummy data
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
    <div className="">
      <h3 className="">Unklab URL Shortener</h3>

      {/* container medium */}
      <div className="">
        <h1 className="">Hello world!</h1>

        <div className="">
          <div className="">
            <h4>Iustus Veritas Scientia</h4>
          </div>
          <div className="">
            <div className="">
              {/* input url */}
              <input
                type=""
                className=""
                placeholder="Masukan URL"
                value={inputUrl}
                onChange={(e) => handleInputUrl(e)}
              />
              {/* end — input url */}
              {isLoading === true && (
                <button className="" type="" onClick={handleSubmitButton}>
                  <span className=""></span> Submit
                </button>
              )}
              {isLoading === false && (
                <button className="" type="" onClick={handleSubmitButton}>
                  Submit
                </button>
              )}
            </div>

            {/* show the shortened URL result */}
            <div className="">
              {shortenedUrlResult.map((url, i) => {
                return (
                  <div className="animate__animated animate__fadeIn" key={i}>
                    <div className="">
                      {/* original url */}
                      <div className="">
                        <a href={url.original} className="">
                          {url.original}
                        </a>
                      </div>
                      {/* end — original url */}
                      {/* shortened url */}
                      <div className="">
                        <a href={url.shortened} className="">
                          {url.shortened}
                        </a>
                      </div>
                      {/* end — shortened url */}
                      {/* copy button */}
                      <div className="">
                        <div className="">
                          <CopyToClipboard text={url.shortened}>
                            <button type="button" className="">
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
