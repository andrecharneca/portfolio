import { useEffect, useState } from "react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setShow(currentScrollY < lastScrollY || currentScrollY < 10);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      } bg-white dark:bg-gray-900 px-6 py-4 flex items-center justify-between`}
    >
      <h1 className="text-2xl font-bold">André Charneca</h1>

      <div className="flex gap-6 items-center">
        {["experience", "publications", "projects", "education", "other"].map(
          (section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="uppercase font-semibold hover:text-emerald-500 dark:hover:text-purple-600 hover:drop-shadow-glow-green dark:hover:drop-shadow-glow-purple"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          )
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="border px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}