import { ExternalLink } from "@/components/ui/ExternalLink";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/projects";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectMedia } from "./ProjectMedia";

const CARD_TAGS = 5;

function Links({ project, locale }: { project: Project; locale: Locale }) {
  const copy = ui.projects;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {project.links.map((link) => (
        <li key={link.href}>
          <ExternalLink href={link.href} newTabLabel={copy.newTab[locale]} className="label">
            {copy.links[link.kind][locale]}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({
  project,
  index,
  locale,
}: {
  project: Project;
  index: number;
  locale: Locale;
}) {
  const copy = ui.projects;
  const extraTags = project.stack.length - CARD_TAGS;

  return (
    <article className="group flex h-full flex-col gap-6">
      <ProjectMedia project={project} locale={locale} />

      <div className="flex items-start justify-between gap-4 border-t border-ink/15 pt-5">
        <div>
          <p className="mb-2 label text-muted-strong">
            {String(index + 1).padStart(2, "0")} · {project.context[locale]}
          </p>
          <h3 className="display text-[clamp(2.75rem,5vw,4.5rem)]">{project.name}</h3>
        </div>
        <p className="shrink-0 pt-1 label text-muted-strong">{project.year}</p>
      </div>

      <p className="max-w-[46ch] text-lg leading-snug">{project.summary[locale]}</p>

      <ul className="flex flex-wrap gap-2" aria-label={copy.stack[locale]}>
        {project.stack.slice(0, CARD_TAGS).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
        {extraTags > 0 && <Tag className="border-transparent bg-ink/5">+{extraTags}</Tag>}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
        <Links project={project} locale={locale} />
        <ProjectDetails
          triggerLabel={copy.details[locale]}
          closeLabel={ui.close[locale]}
          title={project.name}
        >
          <p className="mb-3 label text-muted-strong">
            {project.context[locale]} · {project.year}
          </p>
          <h3 className="mb-6 display text-[clamp(3rem,8vw,5.5rem)]">{project.name}</h3>
          <p className="mb-10 text-lg leading-snug sm:text-xl">{project.summary[locale]}</p>

          <h4 className="mb-4 label text-muted-strong">{copy.features[locale]}</h4>
          <ul className="mb-10 space-y-3">
            {project.features[locale].map((feature) => (
              <li key={feature} className="flex gap-3 leading-snug">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-deep" />
                {feature}
              </li>
            ))}
          </ul>

          <h4 className="mb-4 label text-muted-strong">{copy.stack[locale]}</h4>
          <ul className="mb-10 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </ul>

          <Links project={project} locale={locale} />
        </ProjectDetails>
      </div>
    </article>
  );
}
