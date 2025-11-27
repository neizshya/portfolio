"use client";
import { LAYOUT, TEXT, SPACING, EFFECTS, COLORS_CSS } from "@/lib/styles";
import type { Project } from "@/types";
import Image from "next/image";
import projectsData from "@/data/projects.json";

function TechBadge({ tech }: { tech: string }) {
  return (
    <span
      className={`px-2 sm:px-3 py-1 ${COLORS_CSS.badge} text-xs sm:text-sm rounded-full`}
    >
      {tech.trim()}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const hasGithub = project.github_link && project.github_link.trim() !== "";
  const hasLive = project.live_link && project.live_link.trim() !== "";

  if (!hasGithub && !hasLive) return null;

  return (
    <div className={`flex ${SPACING.buttonGap}`}>
      {hasGithub && (
        <a
          href={project.github_link}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 px-3 sm:px-4 py-2 ${COLORS_CSS.button} text-white ${TEXT.buttonText} rounded-lg ${EFFECTS.transition}`}
        >
          GitHub
        </a>
      )}
      {hasLive && (
        <a
          href={project.live_link}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 px-3 sm:px-4 py-2 ${COLORS_CSS.buttonPrimary} text-white ${TEXT.buttonText} rounded-lg ${EFFECTS.transition}`}
        >
          Live Demo
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`group ${COLORS_CSS.card} rounded-xl overflow-hidden ${EFFECTS.shadow} ${EFFECTS.transition} ${EFFECTS.hoverLift}`}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <div
        className={`relative ${SPACING.cardImage} ${COLORS_CSS.cardImage} overflow-hidden`}
      >
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.title} - ${project.description}`}
            fill
            className={`object-cover ${EFFECTS.hoverScale}`}
            itemProp="image"
          />
        )}
      </div>

      <div className={SPACING.cardPadding}>
        <h3
          className={`${TEXT.cardTitle} ${SPACING.textGap.slice(
            0,
            -1
          )}2 group-hover:text-green-400 ${EFFECTS.transition}`}
          itemProp="name"
        >
          {project.title}
        </h3>

        <p
          className={`${TEXT.cardText} ${SPACING.textGap} min-h-10 sm:min-h-12`}
          itemProp="description"
        >
          {project.description}
        </p>

        <div className={SPACING.textGap}>
          <div className="flex flex-wrap gap-2" itemProp="keywords">
            {project.tech_stack.split(",").map((tech, index) => (
              <TechBadge key={index} tech={tech} />
            ))}
          </div>
        </div>

        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function SectionHeader() {
  return (
    <div className={`text-center ${SPACING.sectionTitle}`}>
      <h2 className={`${TEXT.heading} mb-3 sm:mb-4`}>Featured Projects</h2>
      <p className={TEXT.subheading}>
        A selection of projects I&apos;ve worked on
      </p>
    </div>
  );
}

export default function Projects() {
  const projects = projectsData as Project[];

  return (
    <section className={`${LAYOUT.section} ${COLORS_CSS.gradient}`}>
      <div className={LAYOUT.container}>
        <SectionHeader />

        <div className={LAYOUT.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
