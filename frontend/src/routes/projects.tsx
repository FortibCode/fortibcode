import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Layers, Search } from 'lucide-react'
import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { api } from '@/lib/api'
import type { Project } from '@/lib/api'

export const Route = createFileRoute('/projects')({
  component: Projects,
  head: () => ({
    meta: [
      {
        title: 'Mes Projets | Mon Portfolio',
      },
      {
        name: 'description',
        content: 'Découvrez mes réalisations web. Une galerie d\'applications modernes développées avec des technologies de pointe.',
      },
    ],
  }),
})

function Projects() {
  const [search, setSearch] = useState('')
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then((r) => r.data),
  })

  const filtered = projects.filter(
    (p) =>
      p.is_published &&
      p.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <main className="page-wrap px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="mb-3 flex items-center gap-2">
          <Layers className="h-5 w-5 text-[var(--lagoon-deep)]" />
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
            Portfolio
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Mes Projets
        </h1>
        <p className="mb-8 max-w-xl text-lg text-[var(--sea-ink-soft)]">
          Découvrez mes réalisations — des applications web modernes et performantes.
        </p>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--sea-ink-soft)]" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="island-shell w-full rounded-xl border border-[rgba(23,58,64,0.12)] bg-transparent py-2.5 pl-10 pr-4 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] focus:outline-none focus:ring-2 focus:ring-[rgba(79,184,178,0.4)]"
          />
        </div>
      </motion.div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="island-shell h-72 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="mb-4 text-6xl">🚀</div>
          <h2 className="mb-2 text-xl font-bold text-[var(--sea-ink)]">
            {search ? 'Aucun résultat' : 'Projets à venir...'}
          </h2>
          <p className="text-[var(--sea-ink-soft)]">
            {search
              ? 'Essayez un autre terme de recherche.'
              : 'Les projets seront bientôt disponibles.'}
          </p>
        </motion.div>
      )}
    </main>
  )
}
