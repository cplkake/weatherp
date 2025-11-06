import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/80 py-2 mt-auto z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-sm text-white/60">
        <Link
          href="https://github.com/cplkake/weatherp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <FaGithub className="text-lg" />
          <span>View source on GitHub</span>
        </Link>
        <span className="hidden sm:inline text-white/40">•</span>
        <Link
          href="https://github.com/cplkake"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          @cplkake
        </Link>
      </div>
    </footer>
  );
}
