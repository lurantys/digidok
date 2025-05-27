import { motion } from "framer-motion";
import { BookOpen, Brain, Route } from "lucide-react";
import { AcademicCapIcon, UserGroupIcon, UserIcon, BeakerIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-blue-400" />,
    title: "Articles",
    description: "Access comprehensive articles on AI and healthcare topics"
  },
  {
    icon: <Link to="/quiz"><AcademicCapIcon className="w-8 h-8 text-blue-400" /></Link>,
    title: "Interactive Quizzes",
    description: "Test your knowledge with our engaging quiz system"
  },
  {
    icon: <Route className="w-8 h-8 text-blue-400" />,
    title: "Learning Roadmaps",
    description: "Follow structured paths to master key concepts"
  },
  {
    icon: <Brain className="w-8 h-8 text-blue-400" />,
    title: "Expert Knowledge",
    description: "Learn from industry experts and professionals"
  },
];

const audiences = [
  {
    icon: <UserIcon className="w-7 h-7 text-green-400" />,
    label: "Doctors",
    description: "Stay updated with the latest medical AI advancements"
  },
  {
    icon: <AcademicCapIcon className="w-7 h-7 text-blue-400" />,
    label: "Students",
    description: "Build a strong foundation in healthcare AI"
  },
  {
    icon: <BeakerIcon className="w-7 h-7 text-purple-400" />,
    label: "Researchers",
    description: "Access cutting-edge research and methodologies"
  },
  {
    icon: <UserGroupIcon className="w-7 h-7 text-pink-400" />,
    label: "Teams",
    description: "Collaborate and learn together effectively"
  },
];

export default function Features() {
  return (
    <section className="w-full py-20 px-4 bg-black">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white mb-4">
        What We Offer
      </h2>
      <p className="text-center text-white/60 mb-14 max-w-2xl mx-auto">
        Explore our platform's core features designed to help you master AI in healthcare.
      </p>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1, type: 'tween', duration: 0.13 }}
            whileHover={{ scale: 1.04, boxShadow: "0 4px 24px 0 rgba(37,99,235,0.10)" }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center bg-gradient-to-b from-white/5 to-black/80 border border-white/10 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow min-h-[220px] backdrop-blur"
          >
            <div className="mb-4">{f.icon}</div>
            <div className="text-lg font-semibold text-white mb-1 text-center">
              {f.title}
            </div>
            <div className="text-sm text-white/60 text-center mt-2">
              {f.description}
            </div>
          </motion.div>
        ))}
      </div>
      <h3 className="text-2xl md:text-3xl font-heading font-bold text-center text-white mb-8">
        Who is Digidok for?
      </h3>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {audiences.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1, type: 'tween', duration: 0.13 }}
            whileHover={{ scale: 1.04, boxShadow: "0 4px 24px 0 rgba(37,99,235,0.10)" }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center bg-black/80 border border-white/10 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow min-h-[160px] backdrop-blur"
          >
            <div className="mb-3">{a.icon}</div>
            <div className="text-base font-semibold text-white mb-1 text-center">
              {a.label}
            </div>
            <div className="text-xs text-white/60 text-center mt-1">
              {a.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 