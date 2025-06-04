import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to switch mode in AuthModal if already on /auth
  const handleAuthNav = (mode) => (e) => {
    if (location.pathname === "/auth") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("digidok-auth-mode", { detail: { mode } }));
    } else {
      navigate("/auth", { state: { mode } });
    }
  };

  return (
    <header className="w-full flex items-center justify-between py-6 px-8 md:px-16 bg-midnightNavy sticky top-0 z-30 border-b-2 border-slateGray/30 shadow-[0_2px_8px_0_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-heading font-bold tracking-tight hover:opacity-80 transition-opacity">
          <span className="text-softWhite">DIGIDOK</span><span className="text-fuchsiaAccent">.</span><span className="text-softWhite">AI</span>
        </Link>
      </div>
      <nav className="hidden md:flex gap-8 text-base font-medium text-softWhite/80 flex-1 justify-center">
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={{ type: 'tween', duration: 0.13 }}>
          <Link to="/about" className="hover:text-fuchsiaAccent transition-colors">
            About
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={{ type: 'tween', duration: 0.13 }}>
          <Link to="/quizzes" className="hover:text-fuchsiaAccent transition-colors">
            Quizzes
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={{ type: 'tween', duration: 0.13 }}>
          <Link to="/flashcards" className="hover:text-fuchsiaAccent transition-colors">
            Flashcards
          </Link>
        </motion.div>
      </nav>
      <div className="flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={{ type: 'tween', duration: 0.13 }} className="inline-block">
          <Link
            to="/auth"
            state={{ mode: "login" }}
            onClick={handleAuthNav("login")}
            className="px-5 py-2 rounded-md border-2 border-digitalBlue/40 text-digitalBlue font-semibold hover:bg-digitalBlue/10 transition-colors"
          >
            Log in
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={{ type: 'tween', duration: 0.13 }} className="inline-block">
          <Link
            to="/auth"
            state={{ mode: "signup" }}
            onClick={handleAuthNav("signup")}
            className="px-5 py-2 rounded-md bg-fuchsiaAccent text-softWhite font-semibold hover:bg-fuchsiaAccent/80 transition-colors ml-2"
          >
            Sign up
          </Link>
        </motion.div>
      </div>
    </header>
  );
} 