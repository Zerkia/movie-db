import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-[#032541] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex py-5 px-4 lg:px-4 justify-center lg:justify-start">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <p className="flex items-center" aria-label="TMDb Home">
              <Image
                src="/tmdb-logo.svg"
                alt="TMDb Logo"
                width={150}
                height={38}
                priority
              />
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}
