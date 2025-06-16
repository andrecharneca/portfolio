import ExperienceParagraph, { ExperienceProps } from "./ExperienceParagraph";
import AnimatedSectionTitle from "./AnimatedSectionTitle";

interface ExperienceSectionProps {
  paragraphs: ExperienceProps[];
}

export default function ExperienceSection({
  paragraphs,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="pt-12 space-y-16 px-4 max-w-4xl mx-auto ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} "
    >
      <br></br>
      <AnimatedSectionTitle>Experience</AnimatedSectionTitle>
      {paragraphs.map((p, idx) => (
        <ExperienceParagraph key={idx} {...p} />
      ))}
    </section>
  );
}
