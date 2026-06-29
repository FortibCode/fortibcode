import { t as api } from "./api-BqX1M4Go.js";
import { n as Input, r as Button, t as Textarea } from "./textarea-CTNW_4Ot.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
//#region src/routes/contact.tsx?tsr-split=component
function Contact() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [success, setSuccess] = useState(false);
	const mutation = useMutation({
		mutationFn: () => api.post("/messages", form),
		onSuccess: () => {
			setSuccess(true);
			setForm({
				name: "",
				email: "",
				subject: "",
				message: ""
			});
		}
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate();
	};
	return /* @__PURE__ */ jsxs("main", {
		className: "page-wrap px-4 py-16",
		children: [/* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .5 },
			className: "mb-12",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]",
						children: "Contact"
					})]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl",
					children: "Parlons de votre projet"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "max-w-xl text-lg text-[var(--sea-ink-soft)]",
					children: "Une idée, une question, une opportunité ? N'hésitez pas à me contacter."
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-10 lg:grid-cols-5",
			children: [/* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					x: -20
				},
				animate: {
					opacity: 1,
					x: 0
				},
				transition: {
					duration: .5,
					delay: .2
				},
				className: "lg:col-span-2",
				children: /* @__PURE__ */ jsxs("div", {
					className: "island-shell flex flex-col gap-6 rounded-2xl p-7",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]",
								children: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "mb-0.5 text-sm font-semibold text-[var(--sea-ink)]",
								children: "Email"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-[var(--sea-ink-soft)]",
								children: "okombifortune97@gmail.com"
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]",
								children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "mb-0.5 text-sm font-semibold text-[var(--sea-ink)]",
								children: "Localisation"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-[var(--sea-ink-soft)]",
								children: "Disponible à distance"
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-2 rounded-xl border border-[rgba(79,184,178,0.2)] bg-[rgba(79,184,178,0.06)] p-4",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "⚡ Réponse rapide"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-[var(--sea-ink-soft)]",
								children: "Je réponds généralement sous 24h."
							})]
						})
					]
				})
			}), /* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					x: 20
				},
				animate: {
					opacity: 1,
					x: 0
				},
				transition: {
					duration: .5,
					delay: .3
				},
				className: "lg:col-span-3",
				children: success ? /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						scale: .9
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					className: "island-shell flex flex-col items-center justify-center gap-4 rounded-2xl p-12 text-center",
					children: [
						/* @__PURE__ */ jsx(CheckCircle, { className: "h-16 w-16 text-[var(--lagoon-deep)]" }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold text-[var(--sea-ink)]",
							children: "Message envoyé !"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-[var(--sea-ink-soft)]",
							children: "Merci, je vous répondrai dans les meilleurs délais."
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							onClick: () => setSuccess(false),
							className: "mt-2 rounded-xl",
							children: "Envoyer un autre message"
						})
					]
				}) : /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "island-shell flex flex-col gap-5 rounded-2xl p-7",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "Nom *"
								}), /* @__PURE__ */ jsx(Input, {
									required: true,
									placeholder: "Votre nom",
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									className: "rounded-xl border-[rgba(23,58,64,0.15)] focus:border-[rgba(79,184,178,0.5)] focus:ring-[rgba(79,184,178,0.3)]"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "Email *"
								}), /* @__PURE__ */ jsx(Input, {
									required: true,
									type: "email",
									placeholder: "votre@email.com",
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									}),
									className: "rounded-xl border-[rgba(23,58,64,0.15)] focus:border-[rgba(79,184,178,0.5)] focus:ring-[rgba(79,184,178,0.3)]"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Sujet *"
							}), /* @__PURE__ */ jsx(Input, {
								required: true,
								placeholder: "Le sujet de votre message",
								value: form.subject,
								onChange: (e) => setForm({
									...form,
									subject: e.target.value
								}),
								className: "rounded-xl border-[rgba(23,58,64,0.15)] focus:border-[rgba(79,184,178,0.5)] focus:ring-[rgba(79,184,178,0.3)]"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Message *"
							}), /* @__PURE__ */ jsx(Textarea, {
								required: true,
								rows: 5,
								placeholder: "Décrivez votre projet ou votre question...",
								value: form.message,
								onChange: (e) => setForm({
									...form,
									message: e.target.value
								}),
								className: "rounded-xl border-[rgba(23,58,64,0.15)] focus:border-[rgba(79,184,178,0.5)] focus:ring-[rgba(79,184,178,0.3)]"
							})]
						}),
						mutation.isError && /* @__PURE__ */ jsx("p", {
							className: "text-sm text-red-500",
							children: "Une erreur est survenue. Veuillez réessayer."
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: mutation.isPending,
							className: "group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--sea-ink)] py-3 font-semibold text-white hover:bg-[var(--sea-ink)]/90",
							children: mutation.isPending ? "Envoi en cours..." : /* @__PURE__ */ jsxs(Fragment, { children: ["Envoyer le message", /* @__PURE__ */ jsx(Send, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })] })
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { Contact as component };
