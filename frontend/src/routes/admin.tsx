import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, MessageSquare, LogOut, Eye, Trash2,
  Plus, Lock, Mail, Award, Code2, User as UserIcon, X, Upload, Pencil,
  Globe, Github, Check, AlertCircle, FileText, Calendar
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import type { Project, Message, Certification, Skill, Category } from '@/lib/api'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
  head: () => ({
    meta: [
      {
        title: 'Administration | Mon Portfolio',
      },
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    ],
  }),
})

// ─── Auth Store (simple localStorage) ─────────────────────────────────────────
function getToken() { return localStorage.getItem('auth_token') }
function setToken(t: string) { localStorage.setItem('auth_token', t) }
function clearToken() { localStorage.removeItem('auth_token') }

// ─── Login Form ────────────────────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [creds, setCreds] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const mutation = useMutation({
    mutationFn: () => api.post('/login', creds),
    onSuccess: (res) => {
      setToken(res.data.access_token)
      onSuccess()
    },
    onError: () => setError('Email ou mot de passe invalide.'),
  })

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="island-shell w-full max-w-sm rounded-2xl p-8"
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-[var(--sea-ink)]">Espace Administration</h1>
          <p className="text-sm text-[var(--sea-ink-soft)]">Connexion requise pour accéder au tableau de bord.</p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); mutation.mutate() }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Email</label>
            <Input
              type="email"
              required
              placeholder="fortuneokombi@gmail.com"
              value={creds.email}
              onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Mot de passe</label>
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={creds.password}
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
              className="rounded-xl"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 rounded-xl bg-[var(--sea-ink)] py-2.5 font-semibold text-white"
          >
            {mutation.isPending ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<'projects' | 'certifications' | 'skills' | 'profile' | 'messages'>('projects')
  const qc = useQueryClient()

  // Queries
  const { data: projects = [], isLoading: loadingProjects } = useQuery<Project[]>({
    queryKey: ['admin-projects'],
    queryFn: () => api.get('/projects').then(r => r.data),
  })
  const { data: messages = [], isLoading: loadingMessages } = useQuery<Message[]>({
    queryKey: ['admin-messages'],
    queryFn: () => api.get('/messages').then(r => r.data),
  })
  const { data: certifications = [], isLoading: loadingCertifications } = useQuery<Certification[]>({
    queryKey: ['admin-certifications'],
    queryFn: () => api.get('/certifications').then(r => r.data),
  })
  const { data: skills = [], isLoading: loadingSkills } = useQuery<Skill[]>({
    queryKey: ['admin-skills'],
    queryFn: () => api.get('/skills').then(r => r.data),
  })
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['admin-categories'],
    queryFn: () => api.get('/categories').then(r => r.data),
  })
  const { data: profile } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: () => api.get('/profile').then(r => r.data),
  })

  // Modals state
  const [activeProject, setActiveProject] = useState<Project | null | 'new'>(null)
  const [activeCert, setActiveCert] = useState<Certification | null | 'new'>(null)
  const [activeSkill, setActiveSkill] = useState<Skill | null | 'new'>(null)
  const [activeCategory, setActiveCategory] = useState<Category | null | 'new'>(null)

  // Mutations
  const deleteProject = useMutation({
    mutationFn: (id: number) => api.delete(`/projects/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-projects'] }),
  })
  const deleteCert = useMutation({
    mutationFn: (id: number) => api.delete(`/certifications/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-certifications'] }),
  })
  const deleteSkill = useMutation({
    mutationFn: (id: number) => api.delete(`/skills/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-skills'] }),
  })
  const deleteCategory = useMutation({
    mutationFn: (id: number) => api.delete(`/categories/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-categories'] })
      qc.invalidateQueries({ queryKey: ['admin-skills'] })
    },
  })
  const toggleRead = useMutation({
    mutationFn: ({ id, is_read }: { id: number; is_read: boolean }) =>
      api.put(`/messages/${id}`, { is_read }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-messages'] }),
  })
  const deleteMessage = useMutation({
    mutationFn: (id: number) => api.delete(`/messages/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-messages'] }),
  })

  const unread = messages.filter(m => !m.is_read).length

  return (
    <main className="page-wrap px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--sea-ink)]">Tableau de bord</h1>
          <p className="text-sm text-[var(--sea-ink-soft)]">Gérez votre portfolio professionnel</p>
        </div>
        <Button
          variant="outline"
          onClick={onLogout}
          className="flex items-center gap-2 rounded-xl text-sm"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 grid gap-4 grid-cols-2 sm:grid-cols-4"
      >
        {[
          { icon: FolderKanban, label: 'Projets', value: projects.length, color: 'rgba(79,184,178,0.12)', text: 'var(--lagoon-deep)' },
          { icon: Award, label: 'Certifs', value: certifications.length, color: 'rgba(168,85,247,0.12)', text: '#a855f7' },
          { icon: Code2, label: 'Compétences', value: skills.length, color: 'rgba(234,179,8,0.12)', text: '#ca8a04' },
          { icon: Mail, label: 'Messages non lus', value: unread, color: 'rgba(239,68,68,0.1)', text: '#ef4444' },
        ].map(({ icon: Icon, label, value, color, text }) => (
          <div
            key={label}
            className="island-shell flex items-center gap-3 sm:gap-4 rounded-2xl p-4 sm:p-5"
          >
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ background: color, color: text }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-[var(--sea-ink)]">{value}</p>
              <p className="text-xs sm:text-sm text-[var(--sea-ink-soft)] line-clamp-1">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-6 flex flex-wrap gap-2 border-b border-[var(--line)] pb-4">
          {[
            { key: 'projects', label: 'Projets', icon: FolderKanban },
            { key: 'certifications', label: 'Certifications', icon: Award },
            { key: 'skills', label: 'Compétences', icon: Code2 },
            { key: 'profile', label: 'Profil & Liens', icon: UserIcon },
            { key: 'messages', label: 'Messages', icon: MessageSquare, badge: unread },
          ].map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => setTab(key as typeof tab)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                tab === key
                  ? 'bg-[var(--sea-ink)] text-white shadow-sm'
                  : 'text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)]'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {badge !== undefined && badge > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ml-1">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── Projects Tab ─── */}
        {tab === 'projects' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--sea-ink)]">Mes Projets</h2>
              <Button 
                onClick={() => setActiveProject('new')}
                className="flex items-center gap-2 rounded-xl bg-[var(--sea-ink)] text-sm text-white"
              >
                <Plus className="h-4 w-4" />
                Nouveau projet
              </Button>
            </div>
            {loadingProjects ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="island-shell h-16 animate-pulse rounded-xl" />)}
              </div>
            ) : projects.length === 0 ? (
              <div className="island-shell flex flex-col items-center justify-center rounded-2xl py-16 text-center">
                <FolderKanban className="mb-3 h-10 w-10 text-[var(--sea-ink-soft)]" />
                <p className="font-semibold text-[var(--sea-ink)]">Aucun projet</p>
                <p className="text-sm text-[var(--sea-ink-soft)]">Créez votre premier projet ci-dessus.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="island-shell flex items-center justify-between rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-[rgba(79,184,178,0.1)] flex items-center justify-center flex-shrink-0">
                        {p.image ? (
                          <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-lg font-bold text-[rgba(79,184,178,0.4)]">{p.title.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--sea-ink)]">{p.title}</p>
                        <p className="text-xs text-[var(--sea-ink-soft)] line-clamp-1 max-w-[200px] sm:max-w-md">{p.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={p.is_published ? 'default' : 'secondary'}
                        className={`rounded-full text-xs ${p.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                      >
                        {p.is_published ? 'Publié' : 'Brouillon'}
                      </Badge>
                      <button
                        onClick={() => setActiveProject(p)}
                        className="rounded-lg p-1.5 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Supprimer ce projet ?')) deleteProject.mutate(p.id)
                        }}
                        className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Certifications Tab ─── */}
        {tab === 'certifications' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--sea-ink)]">Certifications</h2>
              <Button 
                onClick={() => setActiveCert('new')}
                className="flex items-center gap-2 rounded-xl bg-[var(--sea-ink)] text-sm text-white"
              >
                <Plus className="h-4 w-4" />
                Nouvelle certification
              </Button>
            </div>
            {loadingCertifications ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="island-shell h-16 animate-pulse rounded-xl" />)}
              </div>
            ) : certifications.length === 0 ? (
              <div className="island-shell flex flex-col items-center justify-center rounded-2xl py-16 text-center">
                <Award className="mb-3 h-10 w-10 text-[var(--sea-ink-soft)]" />
                <p className="font-semibold text-[var(--sea-ink)]">Aucune certification</p>
                <p className="text-sm text-[var(--sea-ink-soft)]">Ajoutez vos diplômes ou certifications.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {certifications.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="island-shell flex items-center justify-between rounded-xl p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[var(--sea-ink)]">{c.name}</p>
                        {c.image && (
                          <span className="rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                            Document joint
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--sea-ink-soft)]">{c.issuer} — {c.issue_date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveCert(c)}
                        className="rounded-lg p-1.5 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Supprimer cette certification ?')) deleteCert.mutate(c.id)
                        }}
                        className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Skills Tab ─── */}
        {tab === 'skills' && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Categories */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-[var(--sea-ink)]">Catégories</h3>
                <Button 
                  onClick={() => setActiveCategory('new')}
                  size="sm"
                  variant="outline"
                  className="rounded-xl text-xs"
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Nouvelle
                </Button>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="island-shell flex items-center justify-between rounded-xl p-3">
                    <span className="text-sm font-medium text-[var(--sea-ink)]">{cat.name}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className="rounded-lg p-1 text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Supprimer cette catégorie ? Cela supprimera aussi les compétences associées.')) deleteCategory.mutate(cat.id)
                        }}
                        className="rounded-lg p-1 text-red-400 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-[var(--sea-ink)]">Compétences</h3>
                <Button 
                  onClick={() => setActiveSkill('new')}
                  size="sm"
                  className="rounded-xl text-xs bg-[var(--sea-ink)] text-white"
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Nouvelle
                </Button>
              </div>
              <div className="space-y-2">
                {loadingSkills ? (
                  <p className="text-sm text-gray-400">Chargement...</p>
                ) : skills.length === 0 ? (
                  <p className="text-sm text-[var(--sea-ink-soft)]">Aucune compétence.</p>
                ) : (
                  skills.map((skill) => (
                    <div key={skill.id} className="island-shell flex items-center justify-between rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sand)] dark:bg-[var(--surface)] p-2">
                          {skill.icon ? (
                            <img src={skill.icon} alt={skill.name} className="h-full w-full object-contain" />
                          ) : (
                            <Code2 className="h-5 w-5 text-[var(--sea-ink-soft)] opacity-60" />
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-[var(--sea-ink)]">{skill.name}</span>
                          <span className="ml-2 rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-gray-400 font-semibold">
                            {skill.category?.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {skill.proficiency && (
                          <span className="text-xs font-mono text-[var(--sea-ink-soft)]">{skill.proficiency}%</span>
                        )}
                        <div className="flex gap-1">
                          <button
                            onClick={() => setActiveSkill(skill)}
                            className="rounded-lg p-1 text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Supprimer cette compétence ?')) deleteSkill.mutate(skill.id)
                            }}
                            className="rounded-lg p-1 text-red-400 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── Profile Tab ─── */}
        {tab === 'profile' && (
          <div className="island-shell max-w-2xl rounded-2xl p-6 sm:p-8">
            <ProfileForm initialProfile={profile} />
          </div>
        )}

        {/* ─── Messages Tab ─── */}
        {tab === 'messages' && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-[var(--sea-ink)]">Messages reçus</h2>
            {loadingMessages ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="island-shell h-20 animate-pulse rounded-xl" />)}
              </div>
            ) : messages.length === 0 ? (
              <div className="island-shell flex flex-col items-center justify-center rounded-2xl py-16 text-center">
                <MessageSquare className="mb-3 h-10 w-10 text-[var(--sea-ink-soft)]" />
                <p className="font-semibold text-[var(--sea-ink)]">Aucun message</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`island-shell rounded-xl p-4 ${!msg.is_read ? 'border-l-2 border-[var(--lagoon-deep)]' : ''}`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--sea-ink)]">{msg.name}</p>
                        <p className="text-xs text-[var(--sea-ink-soft)]">{msg.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!msg.is_read && (
                          <button
                            onClick={() => toggleRead.mutate({ id: msg.id, is_read: true })}
                            className="rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--lagoon-deep)] transition hover:bg-[rgba(79,184,178,0.1)]"
                          >
                            Marquer lu
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('Supprimer ce message ?')) deleteMessage.mutate(msg.id)
                          }}
                          className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="mb-1 text-xs font-medium text-[var(--sea-ink-soft)]">
                      Sujet : {msg.subject}
                    </p>
                    <p className="text-sm text-[var(--sea-ink-soft)] whitespace-pre-wrap">{msg.message}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* ─── Modals / Dialogs ─── */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject === 'new' ? null : activeProject}
            skills={skills}
            onClose={() => setActiveProject(null)}
            onSaved={() => {
              qc.invalidateQueries({ queryKey: ['admin-projects'] })
              setActiveProject(null)
            }}
          />
        )}

        {activeCert && (
          <CertModal
            certification={activeCert === 'new' ? null : activeCert}
            onClose={() => setActiveCert(null)}
            onSaved={() => {
              qc.invalidateQueries({ queryKey: ['admin-certifications'] })
              setActiveCert(null)
            }}
          />
        )}

        {activeSkill && (
          <SkillModal
            skill={activeSkill === 'new' ? null : activeSkill}
            categories={categories}
            onClose={() => setActiveSkill(null)}
            onSaved={() => {
              qc.invalidateQueries({ queryKey: ['admin-skills'] })
              setActiveSkill(null)
            }}
          />
        )}

        {activeCategory && (
          <CategoryModal
            category={activeCategory === 'new' ? null : activeCategory}
            onClose={() => setActiveCategory(null)}
            onSaved={() => {
              qc.invalidateQueries({ queryKey: ['admin-categories'] })
              setActiveCategory(null)
            }}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

// ─── Project Modal ─────────────────────────────────────────────────────────────
interface ProjectModalProps {
  project: Project | null
  skills: Skill[]
  onClose: () => void
  onSaved: () => void
}
function ProjectModal({ project, skills, onClose, onSaved }: ProjectModalProps) {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    url: '',
    github_url: '',
    is_published: false,
    skills: [] as number[],
  })
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        slug: project.slug,
        description: project.description || '',
        content: project.content || '',
        image: project.image || '',
        url: project.url || '',
        github_url: project.github_url || '',
        is_published: project.is_published,
        skills: project.skills ? project.skills.map(s => s.id) : [],
      })
    }
  }, [project])

  const handleTitleChange = (val: string) => {
    setForm(prev => ({
      ...prev,
      title: val,
      // Auto-slugify if it was empty or matches previous title's slug
      slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') 
        ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : prev.slug
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)

    try {
      setIsUploading(true)
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setForm(prev => ({ ...prev, image: res.data.url }))
    } catch (err) {
      alert('Erreur lors du téléchargement de l\'image.')
    } finally {
      setIsUploading(false)
    }
  }

  const toggleSkill = (skillId: number) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId]
    }))
  }

  const mutation = useMutation({
    mutationFn: () => {
      if (project) {
        return api.put(`/projects/${project.id}`, form)
      }
      return api.post('/projects', form)
    },
    onSuccess: onSaved,
    onError: () => alert('Erreur lors de la sauvegarde du projet. Vérifiez le slug ou les champs.')
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="island-shell w-full max-w-2xl rounded-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-xl p-1.5 hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <h3 className="text-xl font-bold text-[var(--sea-ink)] mb-6">
          {project ? 'Modifier le Projet' : 'Nouveau Projet'}
        </h3>

        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--sea-ink)]">Titre</label>
              <Input
                required
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Mon super projet"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--sea-ink)]">Slug</label>
              <Input
                required
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                placeholder="mon-super-projet"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Description courte</label>
            <Input
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Une courte description résumant le projet..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Contenu détaillé</label>
            <Textarea
              rows={5}
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Description complète, défis rencontrés, technologies, etc."
              className="font-sans"
            />
          </div>

          {/* Image upload and url */}
          <div className="grid gap-4 sm:grid-cols-2 items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--sea-ink)]">URL de l'image</label>
              <Input
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] py-2.5 px-4 text-sm font-semibold text-[var(--sea-ink)] cursor-pointer justify-center hover:bg-[var(--link-bg-hover)] transition">
                <Upload className="h-4 w-4" />
                {isUploading ? 'Téléchargement...' : 'Téléverser un fichier'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {form.image && (
            <div className="h-28 w-44 overflow-hidden rounded-xl border border-[var(--line)] relative">
              <img src={form.image} alt="Prévisualisation" className="h-full w-full object-cover" />
              <button 
                type="button" 
                onClick={() => setForm({ ...form, image: '' })}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--sea-ink)]">URL Démo Live</label>
              <Input
                value={form.url}
                onChange={e => setForm({ ...form, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--sea-ink)]">URL GitHub</label>
              <Input
                value={form.github_url}
                onChange={e => setForm({ ...form, github_url: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          {/* Skills Checklist */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Compétences associées</label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border border-[var(--line)] rounded-xl">
              {skills.map(s => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggleSkill(s.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                    form.skills.includes(s.id)
                      ? 'bg-[var(--sea-ink)] text-white border-transparent'
                      : 'bg-transparent text-[var(--sea-ink-soft)] border-[var(--line)] hover:bg-gray-50'
                  }`}
                >
                  {form.skills.includes(s.id) && <Check className="h-3 w-3" />}
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_published"
              checked={form.is_published}
              onChange={e => setForm({ ...form, is_published: e.target.checked })}
              className="h-4 w-4 rounded text-[var(--lagoon-deep)]"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-[var(--sea-ink)]">
              Publier directement ce projet (le rendre visible sur le portfolio)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--line)]">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-xl bg-[var(--sea-ink)] text-white font-semibold px-6"
            >
              {mutation.isPending ? 'Sauvegarde...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Certification Modal ────────────────────────────────────────────────────────
interface CertModalProps {
  certification: Certification | null
  onClose: () => void
  onSaved: () => void
}
function CertModal({ certification, onClose, onSaved }: CertModalProps) {
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    issue_date: '',
    expiration_date: '',
    credential_id: '',
    credential_url: '',
    image: '',
  })
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)

    try {
      setIsUploading(true)
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setForm(prev => ({ ...prev, image: res.data.url }))
    } catch (err) {
      alert('Erreur lors du téléchargement du fichier.')
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (certification) {
      setForm({
        name: certification.name,
        issuer: certification.issuer,
        issue_date: certification.issue_date,
        expiration_date: certification.expiration_date || '',
        credential_id: certification.credential_id || '',
        credential_url: certification.credential_url || '',
        image: certification.image || '',
      })
    }
  }, [certification])

  const mutation = useMutation({
    mutationFn: () => {
      if (certification) {
        return api.put(`/certifications/${certification.id}`, form)
      }
      return api.post('/certifications', form)
    },
    onSuccess: onSaved,
    onError: () => alert('Erreur lors de l\'enregistrement.')
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="island-shell w-full max-w-md rounded-2xl p-6 sm:p-8 relative"
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-xl p-1.5 hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <h3 className="text-lg font-bold text-[var(--sea-ink)] mb-6">
          {certification ? 'Modifier la certification' : 'Nouvelle certification'}
        </h3>

        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Nom du diplôme / certif</label>
            <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="ex: AWS Solutions Architect" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Organisme émetteur</label>
            <Input required value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} placeholder="ex: Amazon Web Services" />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--sea-ink)]">Date d'obtention</label>
              <Input required value={form.issue_date} onChange={e => setForm({ ...form, issue_date: e.target.value })} placeholder="ex: Juin 2025" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--sea-ink)]">Date d'expiration</label>
              <Input value={form.expiration_date} onChange={e => setForm({ ...form, expiration_date: e.target.value })} placeholder="ex: Juin 2028 ou Aucune" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Identifiant du justificatif</label>
            <Input value={form.credential_id} onChange={e => setForm({ ...form, credential_id: e.target.value })} placeholder="ex: AWS-12345" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">URL de vérification</label>
            <Input value={form.credential_url} onChange={e => setForm({ ...form, credential_url: e.target.value })} placeholder="https://..." />
          </div>

          <div className="grid gap-4 grid-cols-2 items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--sea-ink)]">Justificatif (Image/PDF)</label>
              <Input
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] py-2.5 px-4 text-sm font-semibold text-[var(--sea-ink)] cursor-pointer justify-center hover:bg-[var(--link-bg-hover)] transition">
                <Upload className="h-4 w-4" />
                {isUploading ? 'Téléchargement...' : 'Téléverser justificatif'}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {form.image && (
            <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] dark:bg-[var(--surface)] p-2.5 w-max">
              <span className="text-xs text-[var(--sea-ink-soft)] font-medium">Justificatif :</span>
              {form.image.toLowerCase().endsWith('.pdf') ? (
                <span className="text-xs font-mono font-bold text-blue-600">Document PDF</span>
              ) : (
                <img src={form.image} alt="Diplôme" className="h-7 w-7 object-contain" />
              )}
              <button 
                type="button" 
                onClick={() => setForm({ ...form, image: '' })}
                className="bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 ml-2"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Annuler</Button>
            <Button type="submit" disabled={mutation.isPending} className="rounded-xl bg-[var(--sea-ink)] text-white">
              {mutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Skill Modal ───────────────────────────────────────────────────────────────
interface SkillModalProps {
  skill: Skill | null
  categories: Category[]
  onClose: () => void
  onSaved: () => void
}
function SkillModal({ skill, categories, onClose, onSaved }: SkillModalProps) {
  const [form, setForm] = useState({
    name: '',
    category_id: '',
    proficiency: 80,
    icon: '',
  })

  useEffect(() => {
    if (skill) {
      setForm({
        name: skill.name,
        category_id: String(skill.category?.id || ''),
        proficiency: skill.proficiency || 80,
        icon: skill.icon || '',
      })
    } else if (categories.length > 0) {
      setForm(f => ({ ...f, category_id: String(categories[0].id) }))
    }
  }, [skill, categories])

  const mutation = useMutation({
    mutationFn: () => {
      if (skill) {
        return api.put(`/skills/${skill.id}`, form)
      }
      return api.post('/skills', form)
    },
    onSuccess: onSaved,
    onError: () => alert('Erreur.')
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="island-shell w-full max-w-sm rounded-2xl p-6 sm:p-8 relative"
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-xl p-1.5 hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <h3 className="text-lg font-bold text-[var(--sea-ink)] mb-6">
          {skill ? 'Modifier la compétence' : 'Nouvelle compétence'}
        </h3>

        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Nom de la compétence</label>
            <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="ex: React.js, PHP" />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Catégorie</label>
            <select 
              value={form.category_id} 
              onChange={e => setForm({ ...form, category_id: e.target.value })}
              className="flex h-10 w-full rounded-xl border border-[rgba(23,58,64,0.12)] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(79,184,178,0.4)] text-[var(--sea-ink)]"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id} className="text-black">{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">URL de l'icône de la technologie</label>
            <Input 
              value={form.icon} 
              onChange={e => setForm({ ...form, icon: e.target.value })} 
              placeholder="ex: https://cdn.jsdelivr.net/... (SVG ou PNG)" 
            />
            <p className="text-[10px] text-[var(--sea-ink-soft)] opacity-80">
              Astuce : Utilisez un lien d'icône Devicon ou Simple Icons.
            </p>
          </div>

          {form.icon && (
            <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] dark:bg-[var(--surface)] p-2 w-max">
              <span className="text-xs text-[var(--sea-ink-soft)] font-medium">Aperçu :</span>
              <img 
                src={form.icon} 
                alt="Aperçu" 
                className="h-7 w-7 object-contain" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm font-medium text-[var(--sea-ink)]">
              <label>Niveau de maîtrise</label>
              <span>{form.proficiency}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={form.proficiency}
              onChange={e => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--lagoon-deep)]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Annuler</Button>
            <Button type="submit" disabled={mutation.isPending} className="rounded-xl bg-[var(--sea-ink)] text-white">
              {mutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Category Modal ────────────────────────────────────────────────────────────
interface CategoryModalProps {
  category: Category | null
  onClose: () => void
  onSaved: () => void
}
function CategoryModal({ category, onClose, onSaved }: CategoryModalProps) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (category) setName(category.name)
  }, [category])

  const mutation = useMutation({
    mutationFn: () => {
      if (category) {
        return api.put(`/categories/${category.id}`, { name })
      }
      return api.post('/categories', { name })
    },
    onSuccess: onSaved,
    onError: () => alert('Erreur.')
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="island-shell w-full max-w-sm rounded-2xl p-6 sm:p-8 relative"
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-xl p-1.5 hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <h3 className="text-lg font-bold text-[var(--sea-ink)] mb-6">
          {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
        </h3>

        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--sea-ink)]">Nom de la catégorie</label>
            <Input required value={name} onChange={e => setName(e.target.value)} placeholder="ex: Frontend, Backend, Design" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Annuler</Button>
            <Button type="submit" disabled={mutation.isPending} className="rounded-xl bg-[var(--sea-ink)] text-white">
              {mutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Profile Form ──────────────────────────────────────────────────────────────
function ProfileForm({ initialProfile }: { initialProfile: any }) {
  const [form, setForm] = useState({
    id: '',
    title: '',
    bio: '',
    resume_url: '',
    github_url: '',
    linkedin_url: '',
  })
  const qc = useQueryClient()
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (initialProfile) {
      setForm({
        id: String(initialProfile.id || ''),
        title: initialProfile.title || '',
        bio: initialProfile.bio || '',
        resume_url: initialProfile.resume_url || '',
        github_url: initialProfile.github_url || '',
        linkedin_url: initialProfile.linkedin_url || '',
      })
    }
  }, [initialProfile])

  const mutation = useMutation({
    mutationFn: () => {
      if (form.id) {
        return api.put(`/profile/${form.id}`, form)
      }
      return api.post('/profile', form)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-profile'] })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    },
    onError: () => alert('Erreur lors de la mise à jour.')
  })

  return (
    <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="space-y-5">
      <h3 className="text-lg font-bold text-[var(--sea-ink)] mb-4">Informations Professionnelles</h3>
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--sea-ink)]">Titre professionnel</label>
        <Input 
          required 
          value={form.title} 
          onChange={e => setForm({ ...form, title: e.target.value })} 
          placeholder="ex: Développeur Full-Stack" 
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--sea-ink)]">Biographie (À propos)</label>
        <Textarea 
          rows={6} 
          value={form.bio} 
          onChange={e => setForm({ ...form, bio: e.target.value })} 
          placeholder="Racontez votre parcours, vos passions et vos points forts..." 
        />
      </div>

      <h3 className="text-lg font-bold text-[var(--sea-ink)] mt-6 mb-4">Liens & Fichiers</h3>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--sea-ink)]">Lien du CV (ex: Google Drive, PDF)</label>
        <Input 
          value={form.resume_url} 
          onChange={e => setForm({ ...form, resume_url: e.target.value })} 
          placeholder="https://..." 
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--sea-ink)]">Profil GitHub</label>
          <Input 
            value={form.github_url} 
            onChange={e => setForm({ ...form, github_url: e.target.value })} 
            placeholder="https://github.com/mon-username" 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--sea-ink)]">Profil LinkedIn</label>
          <Input 
            value={form.linkedin_url} 
            onChange={e => setForm({ ...form, linkedin_url: e.target.value })} 
            placeholder="https://linkedin.com/in/mon-profil" 
          />
        </div>
      </div>

      {success && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-green-600 font-medium text-sm pt-2"
        >
          <Check className="h-4 w-4" /> Profil enregistré avec succès !
        </motion.div>
      )}

      <div className="pt-4 border-t border-[var(--line)] flex justify-end">
        <Button 
          type="submit" 
          disabled={mutation.isPending}
          className="rounded-xl bg-[var(--sea-ink)] text-white font-semibold px-8"
        >
          {mutation.isPending ? 'Enregistrement...' : 'Enregistrer le profil'}
        </Button>
      </div>
    </form>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken())
  const navigate = useNavigate()
  const qc = useQueryClient()

  const handleLogout = () => {
    api.post('/logout').catch(() => {})
    clearToken()
    setIsAuthenticated(false)
    qc.clear()
    navigate({ to: '/' })
  }

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => setIsAuthenticated(true)} />
  }

  return <Dashboard onLogout={handleLogout} />
}
