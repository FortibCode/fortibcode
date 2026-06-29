import { t as api } from "./api-BqX1M4Go.js";
import { t as Route } from "./projects._slug-DrwR1xmZ.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, CheckCircle2, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
//#region src/routes/projects.$slug.tsx?tsr-split=component
function ProjectDetail() {
	const { slug } = Route.useParams();
	const { data: project, isLoading, error } = useQuery({
		queryKey: ["project", slug],
		queryFn: () => api.get(`/projects/${slug}`).then((r) => r.data)
	});
	if (isLoading) return /* @__PURE__ */ jsxs("div", {
		className: "page-wrap px-4 py-24 flex flex-col gap-6 max-w-4xl",
		children: [
			/* @__PURE__ */ jsx("div", { className: "h-6 w-24 bg-gray-200 animate-pulse rounded" }),
			/* @__PURE__ */ jsx("div", { className: "h-12 w-3/4 bg-gray-200 animate-pulse rounded" }),
			/* @__PURE__ */ jsx("div", { className: "h-64 w-full bg-gray-200 animate-pulse rounded-2xl" }),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx("div", { className: "h-6 w-full bg-gray-200 animate-pulse rounded" }),
					/* @__PURE__ */ jsx("div", { className: "h-6 w-full bg-gray-200 animate-pulse rounded" }),
					/* @__PURE__ */ jsx("div", { className: "h-6 w-2/3 bg-gray-200 animate-pulse rounded" })
				]
			})
		]
	});
	if (error || !project) return /* @__PURE__ */ jsxs("main", {
		className: "page-wrap px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mb-4 text-6xl",
				children: "🔍"
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mb-2 text-xl font-bold text-[var(--sea-ink)]",
				children: "Projet introuvable"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-6 text-[var(--sea-ink-soft)]",
				children: "Le projet demandé n'existe pas ou a été déplacé."
			}),
			/* @__PURE__ */ jsxs(Link, {
				to: "/projects",
				className: "inline-flex items-center gap-2 rounded-xl bg-[var(--sea-ink)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), "Retour aux projets"]
			})
		]
	});
	return /* @__PURE__ */ jsxs("main", {
		className: "page-wrap px-4 py-16 max-w-4xl",
		children: [
			/* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					x: -10
				},
				animate: {
					opacity: 1,
					x: 0
				},
				className: "mb-8",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/projects",
					className: "inline-flex items-center gap-2 text-sm font-semibold text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)] transition",
					children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), "Retour aux projets"]
				})
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .5 },
				className: "mb-10",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl",
					children: project.title
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-[var(--sea-ink-soft)]",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-[var(--lagoon-deep)]" }),
							"Créé le ",
							new Date(project.created_at).toLocaleDateString("fr-FR", {
								year: "numeric",
								month: "long",
								day: "numeric"
							})
						]
					}), /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1.5 text-green-600 font-medium",
						children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }), "Projet Complété"]
					})]
				})]
			}),
			/* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					scale: .98
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .5,
					delay: .1
				},
				className: "mb-12 overflow-hidden rounded-3xl border border-[rgba(23,58,64,0.08)] bg-[rgba(79,184,178,0.04)] shadow-sm",
				children: project.image ? /* @__PURE__ */ jsx("img", {
					src: project.image,
					alt: project.title,
					className: "w-full h-auto max-h-[500px] object-cover"
				}) : /* @__PURE__ */ jsx("div", {
					className: "flex h-[350px] items-center justify-center bg-[linear-gradient(135deg,rgba(79,184,178,0.1),rgba(126,211,191,0.1))]",
					children: /* @__PURE__ */ jsx("span", {
						className: "text-8xl font-bold text-[rgba(79,184,178,0.2)]",
						children: project.title.charAt(0)
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-10 lg:grid-cols-3",
				children: [/* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .5,
						delay: .2
					},
					className: "lg:col-span-2 space-y-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "island-shell rounded-3xl p-8",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "mb-4 text-xl font-bold text-[var(--sea-ink)]",
								children: "Description"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-lg text-[var(--sea-ink-soft)] leading-relaxed mb-6",
								children: project.description
							}),
							project.content && /* @__PURE__ */ jsx("div", {
								className: "text-base text-[var(--sea-ink-soft)] leading-relaxed whitespace-pre-wrap pt-6 border-t border-[var(--line)]",
								children: project.content
							})
						]
					})
				}), /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .5,
						delay: .3
					},
					className: "space-y-6",
					children: [(project.url || project.github_url) && /* @__PURE__ */ jsxs("div", {
						className: "island-shell rounded-3xl p-6 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] mb-2",
								children: "Liens du Projet"
							}),
							project.url && /* @__PURE__ */ jsxs("a", {
								href: project.url,
								target: "_blank",
								rel: "noreferrer",
								className: "flex items-center justify-center gap-2 rounded-xl bg-[var(--sea-ink)] py-3 px-4 text-sm font-semibold text-white transition hover:opacity-90 shadow-sm",
								children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" }), "Visiter le site"]
							}),
							project.github_url && /* @__PURE__ */ jsxs("a", {
								href: project.github_url,
								target: "_blank",
								rel: "noreferrer",
								className: "flex items-center justify-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] py-3 px-4 text-sm font-semibold text-[var(--sea-ink)] hover:bg-[var(--link-bg-hover)] transition",
								children: [/* @__PURE__ */ jsx(Github, { className: "h-4 w-4" }), "Code Source GitHub"]
							})
						]
					}), project.skills && project.skills.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "island-shell rounded-3xl p-6",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] mb-4",
							children: "Technologies utilisées"
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-2",
							children: project.skills.map((skill) => /* @__PURE__ */ jsx("span", {
								className: "inline-flex items-center gap-1 rounded-xl border border-[rgba(79,184,178,0.2)] bg-[rgba(79,184,178,0.05)] px-3 py-1.5 text-xs font-semibold text-[var(--lagoon-deep)]",
								children: skill.name
							}, skill.id))
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { ProjectDetail as component };
