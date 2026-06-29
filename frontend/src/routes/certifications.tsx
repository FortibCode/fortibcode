import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Award, ExternalLink, ShieldCheck, Search, FileText } from 'lucide-react'
import { useState } from 'react'
import { api } from '@/lib/api'
import type { Certification } from '@/lib/api'

export const Route = createFileRoute('/certifications')({
  component: Certifications,
  head: () => ({
    meta: [
      {
        title: 'Certifications | Mon Portfolio',
      },
      {
        name: 'description',
        content: 'Consultez la liste de mes diplômes et certifications techniques validés auprès d\'organismes leaders de l\'industrie.',
      },
    ],
  }),
})

function Certifications() {
  const [search, setSearch] = useState('')
  
  const { data: certifications = [], isLoading } = useQuery<Certification[]>({
    queryKey: ['certifications'],
    queryFn: () => api.get('/certifications').then((r) => r.data),
  })

  const filtered = certifications.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase())
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
          <Award className="h-5 w-5 text-[var(--lagoon-deep)]" />
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
            Reconnaissance
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Certifications
        </h1>
        <p className="mb-8 max-w-xl text-lg text-[var(--sea-ink-soft)]">
          Mes diplômes, certifications professionnelles et accréditations techniques obtenues.
        </p>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--sea-ink-soft)]" />
          <input
            type="text"
            placeholder="Rechercher une certification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="island-shell w-full rounded-xl border border-[rgba(23,58,64,0.12)] bg-transparent py-2.5 pl-10 pr-4 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] focus:outline-none focus:ring-2 focus:ring-[rgba(79,184,178,0.4)]"
          />
        </div>
      </motion.div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="island-shell h-48 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="island-shell flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(30,90,72,0.06)] hover:-translate-y-1"
            >
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(79,184,178,0.1)] text-[var(--lagoon-deep)]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--sea-ink-soft)] bg-[var(--link-bg-hover)] px-2.5 py-1 rounded-full border border-[rgba(23,58,64,0.06)]">
                    {cert.issue_date}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-bold leading-snug text-[var(--sea-ink)] line-clamp-2">
                  {cert.name}
                </h3>
                <p className="mb-4 text-sm font-semibold text-[var(--lagoon-deep)]">
                  {cert.issuer}
                </p>

                {cert.credential_id && (
                  <p className="mb-4 text-xs font-mono text-[var(--sea-ink-soft)]">
                    ID : {cert.credential_id}
                  </p>
                )}
              </div>

              {(cert.credential_url || cert.image) && (
                <div className="mt-4 pt-4 border-t border-[var(--line)] flex flex-wrap gap-x-4 gap-y-2">
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--sea-ink)] hover:text-[var(--lagoon-deep)] transition"
                    >
                      Vérifier en ligne
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {cert.image && (
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)] transition"
                      download
                    >
                      Voir / Télécharger
                      <FileText className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="mb-4 text-6xl">🏆</div>
          <h2 className="mb-2 text-xl font-bold text-[var(--sea-ink)]">
            Aucune certification trouvée
          </h2>
          <p className="text-[var(--sea-ink-soft)]">
            Essayez de modifier votre recherche.
          </p>
        </motion.div>
      )}
    </main>
  )
}
