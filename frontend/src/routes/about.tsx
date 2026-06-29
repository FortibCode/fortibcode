import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { User, Code2, Target, Rocket } from 'lucide-react'
import { api } from '@/lib/api'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [
      {
        title: 'À propos | FortibCode — Fortune Okombi',
      },
      {
        name: 'description',
        content: 'Découvrez mon parcours professionnel, mon expertise technique, mes valeurs de travail et mes compétences de développeur.',
      },
    ],
  }),
})

const timeline = [
  { year: '2022', title: 'Découverte du développement web', desc: 'Premiers pas en HTML, CSS, JavaScript et PHP.' },
  { year: '2023', title: 'Maîtrise de Laravel', desc: "Conception d'applications web complètes avec Laravel et MySQL." },
  { year: '2024', title: 'Fullstack avec React', desc: 'Développement d\'interfaces modernes avec React et TypeScript.' },
  { year: '2025+', title: 'Architecture avancée', desc: 'TanStack Start, API REST découplées, déploiement cloud.' },
]

function About() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile').then((r) => r.data),
  })

  const bio =
    profile?.bio ||
    "Je suis un développeur Full-Stack passionné, spécialisé dans la création d'applications web et mobiles modernes, performantes et intuitives.\n\nMon approche combine rigueur technique et sens du détail visuel. Je construis des architectures découplées, robustes et hautement maintenables."

  return (
    <main className="page-wrap px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="mb-3 flex items-center gap-2">
          <User className="h-5 w-5 text-[var(--lagoon-deep)]" />
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">À propos</span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Qui suis-je ?
        </h1>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="island-shell rounded-2xl p-7">
            <div className="text-base leading-8 text-[var(--sea-ink-soft)] whitespace-pre-wrap">
              {bio}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4 lg:col-span-2"
        >
          {[
            { icon: Code2, title: 'Code propre', desc: 'Des architectures maintenables et bien documentées.' },
            { icon: Target, title: 'Orienté résultats', desc: 'Livraison de fonctionnalités qui apportent de la valeur.' },
            { icon: Rocket, title: 'Apprentissage continu', desc: "Toujours à l'affût des dernières technologies." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="island-shell flex items-start gap-4 rounded-2xl p-5"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-[var(--sea-ink)]">{title}</p>
                <p className="text-sm text-[var(--sea-ink-soft)]">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <h2 className="mb-8 text-2xl font-bold text-[var(--sea-ink)]">Mon parcours</h2>
        <div className="relative border-l-2 border-[rgba(79,184,178,0.3)] pl-6">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-[1.85rem] h-3.5 w-3.5 rounded-full border-2 border-[var(--lagoon-deep)] bg-white" />
              <span className="mb-1 inline-block rounded-full border border-[rgba(79,184,178,0.3)] bg-[rgba(79,184,178,0.08)] px-2.5 py-0.5 text-xs font-semibold text-[var(--lagoon-deep)]">
                {item.year}
              </span>
              <h3 className="mt-1.5 text-base font-semibold text-[var(--sea-ink)]">{item.title}</h3>
              <p className="mt-0.5 text-sm text-[var(--sea-ink-soft)]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
