import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (val) => /.+@.+\..+/.test(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
      className="w-full py-20 px-4 bg-midnightNavy flex flex-col items-center"
    >
      <h3 className="text-3xl md:text-4xl font-heading font-bold text-digitalBlue mb-4 text-center">
        Stay Updated
      </h3>
      <p className="text-softWhite/80 mb-8 text-center max-w-xl">
        Subscribe to our newsletter for the latest updates on AI in healthcare
      </p>
      {submitted ? (
        <div className="text-digitalBlue font-semibold text-lg mb-4">Thank you for subscribing!</div>
      ) : (
        <form
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="email"
            className="flex-1 px-4 py-3 rounded-md border border-digitalBlue bg-midnightNavy text-softWhite placeholder-slateGray focus:border-digitalBlue focus:ring-2 focus:ring-digitalBlue outline-none text-base"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Enter your email"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.06, boxShadow: "0 4px 24px 0 #71D3E3" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'tween', duration: 0.13 }}
            className="px-8 py-3 rounded-md bg-digitalBlue text-softWhite font-semibold hover:bg-tealLightGlow transition-colors focus:outline-none focus:ring-2 focus:ring-digitalBlue"
          >
            Subscribe
          </motion.button>
        </form>
      )}
      {error && <div className="text-fuchsiaAccent mt-2 text-sm">{error}</div>}
      <div className="text-xs text-slateGray mt-6 max-w-xs text-center">
        We respect your privacy. Unsubscribe at any time.
      </div>
    </motion.section>
  );
} 