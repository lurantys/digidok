import "@fontsource/inter/latin.css";
import "@fontsource/poppins/latin.css";
import "./index.css";
import Header from "./components/Header/Header";
import { useState, useRef } from "react";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import AuthModal from "./components/AuthModal/AuthModal";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function AnimatedBackground({ xBlueStyle, yBlueStyle, xGreenStyle, yGreenStyle }) {
  return (
    <>
      <motion.div
        className="fixed z-0 pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          x: xBlueStyle,
          y: yBlueStyle,
          width: "38rem",
          height: "38rem",
          background: "#2563eb",
          opacity: 0.18,
          filter: "blur(120px)",
          borderRadius: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed z-0 pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          x: xGreenStyle,
          y: yGreenStyle,
          width: "30rem",
          height: "30rem",
          background: "#22c55e",
          opacity: 0.13,
          filter: "blur(100px)",
          borderRadius: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}

function AppLayout() {
  // Shared mouse-following effect
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5, px: 0, py: 0 });
  const containerRef = useRef(null);
  const x = useMotionValue(window.innerWidth / 2);
  const y = useMotionValue(window.innerHeight / 2);
  const xGreen = useMotionValue(window.innerWidth / 2);
  const yGreen = useMotionValue(window.innerHeight / 2);

  // Blobs follow cursor in px
  const xBlueStyle = useTransform(x, v => `${v - 304}px`); // 304 = 38rem/2
  const yBlueStyle = useTransform(y, v => `${v - 304}px`);
  const xGreenStyle = useTransform(xGreen, v => `${v - 240}px`); // 240 = 30rem/2
  const yGreenStyle = useTransform(yGreen, v => `${v - 240}px`);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setMouse({ x: px / rect.width, y: py / rect.height, px, py });
    x.set(px);
    y.set(py);
    // For green, mirror horizontally and vertically
    xGreen.set(rect.width - px);
    yGreen.set(rect.height - py);
  };

  const location = useLocation();
  const showBlobs = location.pathname === "/auth";
  const showFooterSeparator = location.pathname !== "/auth";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="font-sans bg-black text-white min-h-screen relative overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {showBlobs && (
        <AnimatedBackground xBlueStyle={xBlueStyle} yBlueStyle={yBlueStyle} xGreenStyle={xGreenStyle} yGreenStyle={yGreenStyle} />
      )}
      <Header />
      <div className="space-y-24 relative z-10">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Newsletter />
            </>
          } />
          <Route path="/auth" element={<AuthModal page />} />
        </Routes>
      </div>
      <Footer transparent={showBlobs} separator={showFooterSeparator} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
