import cookie from "cookie";

import Navbar from "../components/molecules/Navbar";
import HeroImage from "../components/molecules/HeroImage";
import Shortener from "../components/organisms/Shortener";

export default function Home(props) {
  // const jwt = props.data.cookies.accessToken;
  // console.log(jwt);
  console.log(props.data.cookies);

  return (
    <div className="min-vh-100">
      <Navbar />
      <HeroImage />
      <Shortener />
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = {};

  if (context.req.headers.cookie !== undefined) {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    console.log(parsedCookies);
  }

  return { props: { data } };
}
