export default function FlagIcon({ lang, className = "w-5 h-5" }) {
  if (lang === "fr") {
    // France flag SVG
    return (
      <svg viewBox="0 0 24 24" className={className} aria-label="Français" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#fff" />
        <rect width="8" height="24" x="0" y="0" fill="#0055A4" />
        <rect width="8" height="24" x="16" y="0" fill="#EF4135" />
      </svg>
    );
  }
  // Default to UK for 'en'
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="English" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="#00247d" />
      <rect x="10" width="4" height="24" fill="#fff" />
      <rect y="10" width="24" height="4" fill="#fff" />
      <rect x="11" width="2" height="24" fill="#cf142b" />
      <rect y="11" width="24" height="2" fill="#cf142b" />
    </svg>
  );
} 