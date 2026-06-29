import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/lib/api'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="island-shell group relative flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(23,58,64,0.12)]"
    >
      {/* Project Image */}
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="block overflow-hidden">
        {project.image ? (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[rgba(79,184,178,0.1)] to-[rgba(99,102,241,0.1)]">
            <span className="text-4xl font-bold text-[rgba(79,184,178,0.3)]">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link to="/projects/$slug" params={{ slug: project.slug }} className="hover:underline">
          <h3 className="text-base font-bold text-[var(--sea-ink)]">{project.title}</h3>
        </Link>
        {project.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
            {project.description}
          </p>
        )}

        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.skills.slice(0, 4).map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="rounded-full border border-[rgba(79,184,178,0.2)] bg-[rgba(79,184,178,0.07)] px-2.5 py-0.5 text-xs text-[var(--sea-ink)]"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Démo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
