import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AuthModal({ page }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState(location.state?.mode || "login");
  const isSignup = mode === "signup";

  // Mouse-following background blobs (fixed)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const xSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 80, damping: 20 });
  const xGreen = useMotionValue(0.5);
  const yGreen = useMotionValue(0.5);
  const xGreenSpring = useSpring(xGreen, { stiffness: 80, damping: 20 });
  const yGreenSpring = useSpring(yGreen, { stiffness: 80, damping: 20 });

  useEffect(() => {
    x.set(mouse.x);
    y.set(mouse.y);
    xGreen.set(1 - mouse.x);
    yGreen.set(1 - mouse.y);
  }, [mouse, x, y, xGreen, yGreen]);

  const xBlueStyle = useTransform(xSpring, v => `calc(${v * 80}% - 10rem)`);
  const yBlueStyle = useTransform(ySpring, v => `calc(${v * 60}% - 10rem)`);
  const xGreenStyle = useTransform(xGreenSpring, v => `calc(${v * 80}% - 10rem)`);
  const yGreenStyle = useTransform(yGreenSpring, v => `calc(${v * 60}% - 10rem)`);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x, y });
  };

  const validate = () => {
    if (isSignup && !name.trim()) return "Name is required";
    if (!/.+@.+\..+/.test(email)) return "Invalid email";
    if (password.length < 6) return "Password too short";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setSubmitted(true);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.mode) {
        setMode(e.detail.mode);
        setSubmitted(false);
        setError("");
      }
    };
    window.addEventListener("digidok-auth-mode", handler);
    return () => window.removeEventListener("digidok-auth-mode", handler);
  }, []);

  if (page) {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="min-h-screen flex flex-col items-center justify-center bg-midnightNavy relative overflow-hidden cursor-pointer"
      >
        {/* Animated blobs that follow the mouse */}
        <motion.div
          className="absolute z-0 pointer-events-none"
          style={{
            left: "0%",
            top: "0%",
            x: xBlueStyle,
            y: yBlueStyle,
            width: "24rem",
            height: "24rem",
            background: "#2B78E4", // digitalBlue
            opacity: 0.18,
            filter: "blur(80px)",
            borderRadius: "50%",
          }}
        />
        <motion.div
          className="absolute z-0 pointer-events-none"
          style={{
            right: "0%",
            bottom: "0%",
            x: xGreenStyle,
            y: yGreenStyle,
            width: "18rem",
            height: "18rem",
            background: "#71D3E3", // tealLightGlow
            opacity: 0.13,
            filter: "blur(70px)",
            borderRadius: "50%",
          }}
        />
        <button
          className="absolute top-6 left-6 text-slateGray hover:text-softWhite text-2xl font-bold z-10"
          onClick={() => navigate("/")}
          aria-label="Back"
        >
          ←
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="bg-midnightNavy/95 border border-digitalBlue/20 shadow-2xl p-12 w-full max-w-md relative animate-fadeIn mt-10 flex flex-col items-center z-10 rounded-2xl backdrop-blur"
          >
            <h2 className="text-3xl font-heading font-bold mb-2 text-center text-digitalBlue">
              {isSignup ? "Sign Up" : "Log In"}
            </h2>
            <p className="text-slateGray mb-8 text-center text-base">
              {isSignup ? "Create your Digidok account" : "Welcome back to Digidok"}
            </p>
            {submitted ? (
              <div className="text-digitalBlue font-semibold text-lg text-center mb-4">
                {isSignup ? "Signed up successfully!" : "Logged in successfully!"}
              </div>
            ) : (
              <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit} noValidate>
                {isSignup && (
                  <input
                    type="text"
                    className="px-4 py-3 rounded-md border border-digitalBlue/20 bg-midnightNavy text-softWhite placeholder-slateGray focus:border-digitalBlue focus:ring-2 focus:ring-digitalBlue outline-none text-base"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-label="Full Name"
                  />
                )}
                <input
                  type="email"
                  className="px-4 py-3 rounded-md border border-digitalBlue/20 bg-midnightNavy text-softWhite placeholder-slateGray focus:border-digitalBlue focus:ring-2 focus:ring-digitalBlue outline-none text-base"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <input
                  type="password"
                  className="px-4 py-3 rounded-md border border-digitalBlue/20 bg-midnightNavy text-softWhite placeholder-slateGray focus:border-digitalBlue focus:ring-2 focus:ring-digitalBlue outline-none text-base"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
                {error && <div className="text-fuchsiaAccent text-sm">{error}</div>}
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-digitalBlue text-softWhite font-semibold text-lg hover:bg-tealLightGlow transition-colors focus:outline-none focus:ring-2 focus:ring-digitalBlue mt-2 shadow"
                >
                  {isSignup ? "Sign Up" : "Log In"}
                </button>
              </form>
            )}
            <div className="w-full flex items-center my-8">
              <div className="flex-1 h-px bg-slateGray/30" />
              <span className="px-4 text-slateGray text-xs uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-slateGray/30" />
            </div>
            <div className="w-full flex flex-col items-center gap-2">
              {isSignup ? (
                <button className="text-slateGray hover:text-digitalBlue text-sm underline" onClick={() => { setMode("login"); setSubmitted(false); setError(""); }}>
                  Already have an account? Log in
                </button>
              ) : (
                <button className="text-slateGray hover:text-digitalBlue text-sm underline" onClick={() => { setMode("signup"); setSubmitted(false); setError(""); }}>
                  Don&apos;t have an account? Sign up
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-black text-white rounded-xl shadow-lg p-10 w-full max-w-sm relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-white/60 hover:text-white text-xl font-bold"
          onClick={() => navigate("/")}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        {submitted ? (
          <div className="text-green-400 font-semibold text-lg text-center mb-4">
            {isSignup ? "Signed up successfully!" : "Logged in successfully!"}
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              className="px-4 py-3 rounded-md border border-white bg-black text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white outline-none text-base"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <input
              type="password"
              className="px-4 py-3 rounded-md border border-white bg-black text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white outline-none text-base"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white mt-2"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 