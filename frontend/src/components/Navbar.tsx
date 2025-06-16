import { slide as Menu } from "react-burger-menu";
import { useEffect, useState } from "react";
interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const sections = [
  "experience",
  "publications",
  "projects",
  "education",
  "other",
];

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
    <>
      <h1 className="fixed top-4 left-6 text-2xl font-bold z-50 text-gray-900 dark:text-gray-100">
        André Charneca
      </h1>

      <Menu
        right
        className={
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }
        itemListClassName="flex flex-col p-6 space-y-4"
        styles={{
          bmBurgerBars: {
            background: darkMode ? "#fff" : "#111827",
          },
        }}
      >
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`uppercase font-semibold text-left hover:text-emerald-500 dark:hover:text-purple-600 hover:drop-shadow-glow-green dark:hover:drop-shadow-glow-purple`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="border mt-6 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </Menu>
    </>
  );
}

