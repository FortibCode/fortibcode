import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle2 } from 'lucide-react'
import { api } from '@/lib/api'
import type { Project } from '@/lib/api'

export const Route = createFileRoute('/projects/$slug')({
  component: ProjectDetail,
  head: () => ({
    meta: [
      {
        title: 'Détails du Projet | Mon Portfolio',
      },
      {
        name: 'description',
        content: 'Découvrez la description détaillée, la technologie utilisée et les liens de démonstration de ce projet.',
      },
    ],
  }),
})

function ProjectDetail() {
  const { slug } = Route.useParams()

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ['project', slug],
    queryFn: () => api.get(`/projects/${slug}`).then((r) => r.data),
  })

  if (isLoading) {
    return (
      <div className="page-wrap px-4 py-24 flex flex-col gap-6 max-w-4xl">
        <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
        <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded" />
        <div className="h-64 w-full bg-gray-200 animate-pulse rounded-2xl" />
        <div className="space-y-4">
          <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <main className="page-wrap px-4 py-24 text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h2 className="mb-2 text-xl font-bold text-[var(--sea-ink)]">
          Projet introuvable
        </h2>
        <p className="mb-6 text-[var(--sea-ink-soft)]">
          Le projet demandé n'existe pas ou a été déplacé.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--sea-ink)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux projets
        </Link>
      </main>
    )
  }

  return (
    <main className="page-wrap px-4 py-16 max-w-4xl">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux projets
        </Link>
      </motion.div>

      {/* Hero Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          {project.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-[var(--sea-ink-soft)]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-[var(--lagoon-deep)]" />
            Créé le {new Date(project.created_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1.5 text-green-600 font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Projet Complété
          </span>
        </div>
      </motion.div>

      {/* Project Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 overflow-hidden rounded-3xl border border-[rgba(23,58,64,0.08)] bg-[rgba(79,184,178,0.04)] shadow-sm"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        ) : (
          <div className="flex h-[350px] items-center justify-center bg-[linear-gradient(135deg,rgba(79,184,178,0.1),rgba(126,211,191,0.1))]">
            <span className="text-8xl font-bold text-[rgba(79,184,178,0.2)]">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </motion.div>

      {/* Content Layout */}
      <div className="grid gap-10 lg:grid-cols-3">
        {/* Main Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="island-shell rounded-3xl p-8">
            <h2 className="mb-4 text-xl font-bold text-[var(--sea-ink)]">Description</h2>
            <p className="text-lg text-[var(--sea-ink-soft)] leading-relaxed mb-6">
              {project.description}
            </p>
            {project.content && (
              <div 
                className="text-base text-[var(--sea-ink-soft)] leading-relaxed whitespace-pre-wrap pt-6 border-t border-[var(--line)]"
              >
                {project.content}
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar / Sidebar Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Links */}
          {(project.url || project.github_url) && (
            <div className="island-shell rounded-3xl p-6 flex flex-col gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] mb-2">Liens du Projet</h3>
              
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[var(--sea-ink)] py-3 px-4 text-sm font-semibold text-white transition hover:opacity-90 shadow-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visiter le site
                </a>
              )}
              
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] py-3 px-4 text-sm font-semibold text-[var(--sea-ink)] hover:bg-[var(--link-bg-hover)] transition"
                >
                  <Github className="h-4 w-4" />
                  Code Source GitHub
                </a>
              )}
            </div>
          )}

          {/* Skills / Tech Stack */}
          {project.skills && project.skills.length > 0 && (
            <div className="island-shell rounded-3xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] mb-4">Technologies utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1 rounded-xl border border-[rgba(79,184,178,0.2)] bg-[rgba(79,184,178,0.05)] px-3 py-1.5 text-xs font-semibold text-[var(--lagoon-deep)]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
