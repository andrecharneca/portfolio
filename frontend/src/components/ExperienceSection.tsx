import ExperienceParagraph, { ExperienceProps } from "./ExperienceParagraph";
import AnimatedSectionTitle from "./AnimatedSectionTitle";

interface ExperienceSectionProps {
  paragraphs: ExperienceProps[];
}

export default function  ExperienceSection({paragraphs }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      // className="pt-12 space-y-16 px-4 max-w-4xl mx-auto ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} "
      className="sticky top-0 overflow-auto px-4 py-1 h-dvh flex flex-col justify-center ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} bg-gradient-to-b from-green-200 to-blue-200 dark:from-purple-700 dark:to-blue-800"
    >
      <br></br>
      <AnimatedSectionTitle>💼 Experience</AnimatedSectionTitle>
      {paragraphs.map((p, idx) => (
        <ExperienceParagraph key={idx} {...p} />
      ))}
    </section>
  );
}
