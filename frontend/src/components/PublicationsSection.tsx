import PublicationsParagraph from "./PublicationsParagraph";
import { PublicationsProps } from "./PublicationsParagraph";
import AnimatedSectionTitle from "./AnimatedSectionTitle";

interface PublicationsSectionProps {
  paragraphs: PublicationsProps[];
}

export default function PublicationsSection({ paragraphs }: PublicationsSectionProps) {
  return (
    <section
      id="publications"
      className="sticky top-0 px-4 h-dvh flex flex-col justify-center ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} bg-gradient-to-b from-green-200 to-blue-200 dark:from-purple-700 dark:to-blue-800"
    >
      <br></br>
      <AnimatedSectionTitle>👨🏻‍🏫 Published Research</AnimatedSectionTitle>
      {paragraphs.map((p, idx) => (
        <PublicationsParagraph key={idx} {...p} />
      ))}
    </section>
  );
}
