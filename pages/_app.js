// bootstrap css from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "animate.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
