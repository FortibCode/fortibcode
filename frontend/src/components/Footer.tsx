import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Github, Linkedin, Mail } from 'lucide-react'
import { api } from '@/lib/api'

export default function Footer() {
  const year = new Date().getFullYear()

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile').then((r) => r.data),
  })

  const githubUrl = profile?.github_url || 'https://github.com/okombifortune'
  const linkedinUrl = profile?.linkedin_url || 'https://linkedin.com/in/fortune-okombi'

  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[var(--header-bg)] px-4 pb-12 pt-16 text-[var(--sea-ink-soft)]">
      <div className="page-wrap grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* Colonne 1: Branding & Description */}
        <div className="flex flex-col gap-4 md:col-span-5">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="FortibCode Logo" className="h-9 w-9 rounded-full" />
            <span className="font-sans text-lg font-bold tracking-tight text-[var(--sea-ink)]">
              FortibCode
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            Développeur Full-Stack passionné par la création d'expériences web modernes,
            robustes et centrées sur l'utilisateur.
          </p>
        </div>

        {/* Colonne 2: Navigation rapide */}
        <div className="flex flex-col gap-3 md:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--sea-ink)]">
            Navigation
          </h4>
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link to="/" className="hover:text-[var(--sea-ink)] transition">
              Accueil
            </Link>
            <Link to="/about" className="hover:text-[var(--sea-ink)] transition">
              À propos
            </Link>
            <Link to="/projects" className="hover:text-[var(--sea-ink)] transition">
              Projets
            </Link>
            <Link to="/certifications" className="hover:text-[var(--sea-ink)] transition">
              Certifications
            </Link>
            <Link to="/contact" className="hover:text-[var(--sea-ink)] transition">
              Contact
            </Link>
          </nav>
        </div>

        {/* Colonne 3: Contact & Réseaux */}
        <div className="flex flex-col gap-4 md:col-span-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--sea-ink)]">
            Contact & Réseaux
          </h4>
          <div className="flex flex-col gap-2.5 text-sm font-medium">
            <a
              href="mailto:fortuneokombi@gmail.com"
              className="flex items-center gap-2 hover:text-[var(--sea-ink)] transition"
            >
              <Mail className="h-4 w-4 text-[var(--lagoon-deep)]" />
              <span>okombifortune97@gmail.com</span>
            </a>
          </div>
          <div className="mt-2 flex gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] shadow-sm transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] shadow-sm transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Ligne inférieure: Copyright */}
      <div className="page-wrap mt-12 border-t border-[var(--line)] pt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-xs">
          &copy; {year} Fortune Okombi. Tous droits réservés.
        </p>
        <p className="m-0 text-xs text-[var(--sea-ink-soft)] opacity-80">
          Créé avec soin et professionnalisme.
        </p>
      </div>
    </footer>
  )
}
