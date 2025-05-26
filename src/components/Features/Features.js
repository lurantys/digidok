import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Brain, Route } from "lucide-react";
import { AcademicCapIcon, UserGroupIcon, UserIcon, BeakerIcon } from "@heroicons/react/24/outline";

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-blue-400" />, // Articles
    titleKey: "features.articles",
    descKey: "features.articlesDesc"
  },
  {
    icon: <AcademicCapIcon className="w-8 h-8 text-blue-400" />, // Quiz
    titleKey: "features.quiz",
    descKey: "features.quizDesc"
  },
  {
    icon: <Route className="w-8 h-8 text-blue-400" />, // Roadmaps
    titleKey: "features.roadmaps",
    descKey: "features.roadmapsDesc"
  },
  {
    icon: <Brain className="w-8 h-8 text-blue-400" />, // Expertise
    titleKey: "features.expertise",
    descKey: "features.expertiseDesc"
  },
];

const audiences = [
  {
    icon: <UserIcon className="w-7 h-7 text-green-400" />,
    labelKey: "audience.doctors",
    descKey: "audience.doctorsDesc"
  },
  {
    icon: <AcademicCapIcon className="w-7 h-7 text-blue-400" />,
    labelKey: "audience.students",
    descKey: "audience.studentsDesc"
  },
  {
    icon: <BeakerIcon className="w-7 h-7 text-purple-400" />,
    labelKey: "audience.researchers",
    descKey: "audience.researchersDesc"
  },
  {
    icon: <UserGroupIcon className="w-7 h-7 text-pink-400" />,
    labelKey: "audience.teams",
    descKey: "audience.teamsDesc"
  },
];

export default function Features() {
  const { t } = useTranslation();
  return (
    <section className="w-full py-20 px-4 bg-black">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white mb-4">
        {t("features.whatWeOffer", "What We Offer")}
      </h2>
      <p className="text-center text-white/60 mb-14 max-w-2xl mx-auto">
        {t("features.intro", "Explore our platform's core features designed to help you master AI in healthcare.")}
      </p>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {features.map((f, i) => (
          <motion.div
            key={f.titleKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center bg-gradient-to-b from-white/5 to-black/80 border border-white/10 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow min-h-[220px] backdrop-blur"
          >
            <div className="mb-4">{f.icon}</div>
            <div className="text-lg font-semibold text-white mb-1 text-center">
              {t(f.titleKey)}
            </div>
            <div className="text-sm text-white/60 text-center mt-2">
              {t(f.descKey)}
            </div>
          </motion.div>
        ))}
      </div>
      <h3 className="text-2xl md:text-3xl font-heading font-bold text-center text-white mb-8">
        {t("features.whoFor", "Who is Digidok for?")}
      </h3>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {audiences.map((a, i) => (
          <motion.div
            key={a.labelKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center bg-black/80 border border-white/10 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow min-h-[160px] backdrop-blur"
          >
            <div className="mb-3">{a.icon}</div>
            <div className="text-base font-semibold text-white mb-1 text-center">
              {t(a.labelKey)}
            </div>
            <div className="text-xs text-white/60 text-center mt-1">
              {t(a.descKey)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 