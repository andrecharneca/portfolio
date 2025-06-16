import PublicationsParagraph from "./PublicationsParagraph";
import { PublicationsProps } from "./PublicationsParagraph";
import AnimatedSectionTitle from "./AnimatedSectionTitle";

interface PublicationsSectionProps {
  paragraphs: PublicationsProps[];
}

export default function PublicationsSection({
  paragraphs,
}: PublicationsSectionProps) {
  return (
    <section
      id="publications"
      className="pt-12 space-y-16 px-4 max-w-4xl mx-auto ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} "
    >
      <br></br>
      <AnimatedSectionTitle>👨🏻‍🏫 Published Research</AnimatedSectionTitle>
      {paragraphs.map((p, idx) => (
        <PublicationsParagraph key={idx} {...p} />
      ))}
    </section>
  );
}
