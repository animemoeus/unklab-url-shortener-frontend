import Navbar from "../components/molecules/Navbar";
import Shortener from "../components/organisms/Shortener";
import HeroImage from "../components/molecules/HeroImage";

export default function Home() {
  return (
    <div className="min-vh-100">
      <Navbar />
      <HeroImage />
      <Shortener />
    </div>
  );
}
