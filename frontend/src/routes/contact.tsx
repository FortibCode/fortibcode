import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: [
      {
        title: 'Contact | FortibCode — Fortune Okombi',
      },
      {
        name: 'description',
        content: 'Prenez contact avec moi pour discuter de vos projets, de collaborations professionnelles ou pour toute autre question.',
      },
    ],
  }),
})

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [success, setSuccess] = useState(false)

  const mutation = useMutation({
    mutationFn: () => api.post('/messages', form),
    onSuccess: () => {
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

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
          <Mail className="h-5 w-5 text-[var(--lagoon-deep)]" />
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
            Contact
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Parlons de votre projet
        </h1>
        <p className="max-w-xl text-lg text-[var(--sea-ink-soft)]">
          Une idée, une question, une opportunité ? N&apos;hésitez pas à me contacter.
        </p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="island-shell flex flex-col gap-6 rounded-2xl p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="mb-0.5 text-sm font-semibold text-[var(--sea-ink)]">Email</p>
                <p className="text-sm text-[var(--sea-ink-soft)]">okombifortune97@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="mb-0.5 text-sm font-semibold text-[var(--sea-ink)]">Localisation</p>
                <p className="text-sm text-[var(--sea-ink-soft)]">Disponible à distance</p>
              </div>
            </div>
            <div className="mt-2 rounded-xl border border-[rgba(79,184,178,0.2)] bg-[rgba(79,184,178,0.06)] p-4">
              <p className="text-sm font-medium text-[var(--sea-ink)]">⚡ Réponse rapide</p>
              <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
                Je réponds généralement sous 24h.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3"
        >
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="island-shell flex flex-col items-center justify-center gap-4 rounded-2xl p-12 text-center"
            >
              <CheckCircle className="h-16 w-16 text-[var(--lagoon-deep)]" />
              <h2 className="text-xl font-bold text-[var(--sea-ink)]">Message envoyé !</h2>
              <p className="text-[var(--sea-ink-soft)]">
                Merci, je vous répondrai dans les meilleurs délais.
              </p>
              <Button
                variant="outline"
                onClick={() => setSuccess(false)}
                className="mt-2 rounded-xl"
              >
                Envoyer un autre message
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="island-shell flex flex-col gap-5 rounded-2xl p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[var(--sea-ink)]">Nom *</label>
                  <Input
                    required
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl border-[rgba(23,58,64,0.15)] focus:border-[rgba(79,184,178,0.5)] focus:ring-[rgba(79,184,178,0.3)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[var(--sea-ink)]">Email *</label>
                  <Input
                    required
                    type="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-xl border-[rgba(23,58,64,0.15)] focus:border-[rgba(79,184,178,0.5)] focus:ring-[rgba(79,184,178,0.3)]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--sea-ink)]">Sujet *</label>
                <Input
                  required
                  placeholder="Le sujet de votre message"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="rounded-xl border-[rgba(23,58,64,0.15)] focus:border-[rgba(79,184,178,0.5)] focus:ring-[rgba(79,184,178,0.3)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--sea-ink)]">Message *</label>
                <Textarea
                  required
                  rows={5}
                  placeholder="Décrivez votre projet ou votre question..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="rounded-xl border-[rgba(23,58,64,0.15)] focus:border-[rgba(79,184,178,0.5)] focus:ring-[rgba(79,184,178,0.3)]"
                />
              </div>
              {mutation.isError && (
                <p className="text-sm text-red-500">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--sea-ink)] py-3 font-semibold text-white hover:bg-[var(--sea-ink)]/90"
              >
                {mutation.isPending ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    Envoyer le message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  )
}
