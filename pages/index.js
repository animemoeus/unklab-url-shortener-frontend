import cookie from "cookie";

import Navbar from "../components/molecules/Navbar";
import HeroImage from "../components/molecules/HeroImage";
import Shortener from "../components/organisms/Shortener";

export default function Home(props) {
  return (
    <div className="min-vh-100 ">
      <Navbar />
      {/* start header */}
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
          <h1 className="text-center text-white">
            Penyingkat Tautan dan builder Microsite dalam satu tempat
          </h1>
          <div className="row">
            <div className="col-md-8 p-1">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukan Link..."
                />
              </div>
              {/* <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repudiandae sint dolor veritatis nemo omnis dolorem autem magni
                reiciendis suscipit iusto porro dolore debitis quas quasi
                consectetur facilis, iure eveniet pariatur.
              </p> */}
            </div>
            <div className="col-md-4 p-1">
              <div className="input-group input-group-lg">
                <button type="button" className="btn btn-primary w-100">
                  Singkatkan!
                </button>
              </div>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                voluptatibus alias cupiditate id similique magnam laborum
                consequuntur accusantium, perspiciatis, dolore dolorum ipsum nam
                provident architecto? Adipisci optio non repellat accusantium!
              </p> */}
            </div>
          </div>
        </div>
      </div>
      {/* end header */}
      <div className="container-fluid border">
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
