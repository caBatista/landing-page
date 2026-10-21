import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { projects } from "@/content/projects";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { ProjectCard } from "./ProjectCard";

export function Projects({ locale }: { locale: Locale }) {
  const copy = ui.projects;
  return (
    <section
      id="on-code"
      tabIndex={-1}
      aria-labelledby="projects-title"
      className="container-x py-28 outline-none md:py-40"
    >
      <Reveal className="mb-16 md:mb-24">
        <p data-reveal-fade className="mb-6 label text-muted-strong">
          {copy.eyebrow[locale]} · {String(projects.length).padStart(2, "0")}
        </p>
        <SplitHeading
          id="projects-title"
          top={copy.title.top[locale]}
          bottom={copy.title.bottom[locale]}
          className="text-[clamp(5rem,16vw,14rem)]"
          bottomClassName="pl-[0.6em]"
        />
      </Reveal>
      <ul className="grid gap-x-8 gap-y-24 md:grid-cols-2 lg:gap-x-12">
        {projects.map((project, index) => (
          <li key={project.slug} className={index % 2 === 1 ? "md:mt-32" : undefined}>
            <Reveal start="top 88%" className="h-full">
              <div data-reveal-fade className="h-full">
                <ProjectCard project={project} index={index} locale={locale} />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
