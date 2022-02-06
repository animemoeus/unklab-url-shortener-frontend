import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="shadow-sm">
      <div className="text-center pb-3">
        <Image
          src="/img/logo-unklab.png"
          alt="Logo Unklab"
          width={405}
          height={300}
          placeholder="blur"
          blurDataURL="/img/logo-unklab.png"
        />

        <h1>Unklab Shortener Link</h1>
      </div>
    </div>
  );
}
