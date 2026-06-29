import { t as api } from "./api-BqX1M4Go.js";
import { t as Badge } from "./badge-DVIKFGgX.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Layers, Search } from "lucide-react";
import { motion } from "framer-motion";
//#region src/components/ProjectCard.tsx
function ProjectCard({ project, index }) {
	return /* @__PURE__ */ jsxs(motion.article, {
		initial: {
			opacity: 0,
			y: 30
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: { once: true },
		transition: {
			duration: .5,
			delay: index * .1
		},
		className: "island-shell group relative flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(23,58,64,0.12)]",
		children: [/* @__PURE__ */ jsx(Link, {
			to: "/projects/$slug",
			params: { slug: project.slug },
			className: "block overflow-hidden",
			children: project.image ? /* @__PURE__ */ jsx("div", {
				className: "h-48 w-full overflow-hidden",
				children: /* @__PURE__ */ jsx("img", {
					src: project.image,
					alt: project.title,
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				})
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex h-48 items-center justify-center bg-gradient-to-br from-[rgba(79,184,178,0.1)] to-[rgba(99,102,241,0.1)]",
				children: /* @__PURE__ */ jsx("span", {
					className: "text-4xl font-bold text-[rgba(79,184,178,0.3)]",
					children: project.title.charAt(0)
				})
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-1 flex-col gap-3 p-5",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/projects/$slug",
					params: { slug: project.slug },
					className: "hover:underline",
					children: /* @__PURE__ */ jsx("h3", {
						className: "text-base font-bold text-[var(--sea-ink)]",
						children: project.title
					})
				}),
				project.description && /* @__PURE__ */ jsx("p", {
					className: "line-clamp-2 text-sm leading-relaxed text-[var(--sea-ink-soft)]",
					children: project.description
				}),
				project.skills && project.skills.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-1.5",
					children: project.skills.slice(0, 4).map((skill) => /* @__PURE__ */ jsx(Badge, {
						variant: "secondary",
						className: "rounded-full border border-[rgba(79,184,178,0.2)] bg-[rgba(79,184,178,0.07)] px-2.5 py-0.5 text-xs text-[var(--sea-ink)]",
						children: skill.name
					}, skill.id))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-auto flex items-center gap-3 pt-2",
					children: [project.github_url && /* @__PURE__ */ jsxs("a", {
						href: project.github_url,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
						children: [/* @__PURE__ */ jsx(Github, { className: "h-3.5 w-3.5" }), "GitHub"]
					}), project.url && /* @__PURE__ */ jsxs("a", {
						href: project.url,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
						children: [/* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" }), "Démo"]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/routes/projects.tsx?tsr-split=component
function Projects() {
	const [search, setSearch] = useState("");
	const { data: projects = [], isLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: () => api.get("/projects").then((r) => r.data)
	});
	const filtered = projects.filter((p) => p.is_published && p.title.toLowerCase().includes(search.toLowerCase()));
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
					children: [/* @__PURE__ */ jsx(Layers, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]",
						children: "Portfolio"
					})]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl",
					children: "Mes Projets"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-8 max-w-xl text-lg text-[var(--sea-ink-soft)]",
					children: "Découvrez mes réalisations — des applications web modernes et performantes."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative max-w-sm",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--sea-ink-soft)]" }), /* @__PURE__ */ jsx("input", {
						type: "text",
						placeholder: "Rechercher un projet...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "island-shell w-full rounded-xl border border-[rgba(23,58,64,0.12)] bg-transparent py-2.5 pl-10 pr-4 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] focus:outline-none focus:ring-2 focus:ring-[rgba(79,184,178,0.4)]"
					})]
				})
			]
		}), isLoading ? /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				1,
				2,
				3,
				4,
				5,
				6
			].map((i) => /* @__PURE__ */ jsx("div", { className: "island-shell h-72 animate-pulse rounded-2xl" }, i))
		}) : filtered.length > 0 ? /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: filtered.map((project, index) => /* @__PURE__ */ jsx(ProjectCard, {
				project,
				index
			}, project.id))
		}) : /* @__PURE__ */ jsxs(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			className: "flex flex-col items-center justify-center py-24 text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "mb-4 text-6xl",
					children: "🚀"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mb-2 text-xl font-bold text-[var(--sea-ink)]",
					children: search ? "Aucun résultat" : "Projets à venir..."
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-[var(--sea-ink-soft)]",
					children: search ? "Essayez un autre terme de recherche." : "Les projets seront bientôt disponibles."
				})
			]
		})]
	});
}
//#endregion
export { Projects as component };
