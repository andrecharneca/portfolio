import React, { useEffect, useState } from "react";
import Navbar from "./components/navBar";
import { ExperienceProps } from "./components/ExperienceParagraph";
import ExperienceSection from "./components/ExperienceSection";
import ProfileSection, { Profile } from "./components/ProfileSection";
import PublicationsSection from "./components/PublicationsSection";
import { PublicationsProps } from "./components/PublicationsParagraph";

type Project = {
  title: string;
  location: string;
  period: string;
  description: string;
  grade: string;
};

type EducationItem = {
  degree: string;
  school: string;
  location: string;
  period: string;
  details: string;
};

type Other = {
  languages: string[];
  skills: string[];
};

type CV = {
  experience: ExperienceProps[];
  publications: PublicationsProps[];
  projects: Project[];
  education: EducationItem[];
  other: Other;
};


export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cv, setCv] = useState<CV | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetch('http://localhost:8080/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error('Failed to fetch profile:', err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/cv")
      .then((res) => res.json())
      .then(setCv)
      .catch(console.error);
  }, []);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (!cv) return <div>Loading CV...</div>;

  return (
    <div className=" transition-colors duration-500 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="relative">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode} />
        <ProfileSection profile={profile} />
        <div className="sticky top-0 min-h-dvh flex flex-col items-center justify-center text-white bg-gray-700">
            <h2 className="text-4xl font-bold flex">Here's where I've worked.</h2>
            <h3 className="mt-2">Keep scrolling...</h3>
        </div>
        <ExperienceSection paragraphs={cv.experience} />
        <div className="sticky top-0 h-dvh flex flex-col items-center justify-center text-white bg-gray-700">
            <h2 className="text-4xl font-bold flex">Next up, academic publications!</h2>
            <h3 className="mt-2">Hope you like Large Language Models...</h3>
        </div>
        <PublicationsSection paragraphs={cv.publications} />
        <div className="sticky top-0 h-dvh flex flex-col items-center justify-center text-white bg-gray-700">
            <h2 className="text-4xl font-bold flex">Next up, academic publications!</h2>
            <h3 className="mt-2">Hope you like Large Language Models...</h3>
        </div>
        <ExperienceSection paragraphs={cv.experience} />
      </div>



      
      <main className="pt-20 px-6 max-w-4xl mx-auto space-y-12">

        {/* Projects Section */}
        <section id="projects">
          <h2 className="text-3xl font-bold mb-4"><br></br>Projects</h2>
          {cv.projects.map((proj, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-xl font-semibold">{proj.title}</h3>
              <p className="italic text-gray-600 mb-1">
                {proj.location} — {proj.period} {proj.grade && `— Grade: ${proj.grade}`}
              </p>
              <p>{proj.description}</p>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section id="education">
          <h2 className="text-3xl font-bold mb-4">Education</h2>
          {cv.education.map((edu, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="italic text-gray-600 mb-1">
                {edu.school} — {edu.location}
              </p>
              <p className="mb-1">{edu.period}</p>
              <p>{edu.details}</p>
            </div>
          ))}
        </section>

        {/* Other Skills Section */}
        <section id="other">
          <h2 className="text-3xl font-bold mb-4">Other Skills</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Languages</h3>
            <ul className="list-disc list-inside">
              {cv.other.languages.map((lang, idx) => (
                <li key={idx}>{lang}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Technical Skills</h3>
            <ul className="list-disc list-inside">
              {cv.other.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
