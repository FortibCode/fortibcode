import { t as api } from "./api-BqX1M4Go.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Award, ExternalLink, FileText, Search, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
//#region src/routes/certifications.tsx?tsr-split=component
function Certifications() {
	const [search, setSearch] = useState("");
	const { data: certifications = [], isLoading } = useQuery({
		queryKey: ["certifications"],
		queryFn: () => api.get("/certifications").then((r) => r.data)
	});
	const filtered = certifications.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase()));
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
					children: [/* @__PURE__ */ jsx(Award, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]",
						children: "Reconnaissance"
					})]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl",
					children: "Certifications"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-8 max-w-xl text-lg text-[var(--sea-ink-soft)]",
					children: "Mes diplômes, certifications professionnelles et accréditations techniques obtenues."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative max-w-sm",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--sea-ink-soft)]" }), /* @__PURE__ */ jsx("input", {
						type: "text",
						placeholder: "Rechercher une certification...",
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
				3
			].map((i) => /* @__PURE__ */ jsx("div", { className: "island-shell h-48 animate-pulse rounded-2xl" }, i))
		}) : filtered.length > 0 ? /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: filtered.map((cert, index) => /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .4,
					delay: index * .1
				},
				className: "island-shell flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(30,90,72,0.06)] hover:-translate-y-1",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-start justify-between",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(79,184,178,0.1)] text-[var(--lagoon-deep)]",
							children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-6 w-6" })
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-[var(--sea-ink-soft)] bg-[var(--link-bg-hover)] px-2.5 py-1 rounded-full border border-[rgba(23,58,64,0.06)]",
							children: cert.issue_date
						})]
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mb-2 text-lg font-bold leading-snug text-[var(--sea-ink)] line-clamp-2",
						children: cert.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mb-4 text-sm font-semibold text-[var(--lagoon-deep)]",
						children: cert.issuer
					}),
					cert.credential_id && /* @__PURE__ */ jsxs("p", {
						className: "mb-4 text-xs font-mono text-[var(--sea-ink-soft)]",
						children: ["ID : ", cert.credential_id]
					})
				] }), (cert.credential_url || cert.image) && /* @__PURE__ */ jsxs("div", {
					className: "mt-4 pt-4 border-t border-[var(--line)] flex flex-wrap gap-x-4 gap-y-2",
					children: [cert.credential_url && /* @__PURE__ */ jsxs("a", {
						href: cert.credential_url,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--sea-ink)] hover:text-[var(--lagoon-deep)] transition",
						children: ["Vérifier en ligne", /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })]
					}), cert.image && /* @__PURE__ */ jsxs("a", {
						href: cert.image,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)] transition",
						download: true,
						children: ["Voir / Télécharger", /* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5" })]
					})]
				})]
			}, cert.id))
		}) : /* @__PURE__ */ jsxs(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			className: "flex flex-col items-center justify-center py-24 text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "mb-4 text-6xl",
					children: "🏆"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mb-2 text-xl font-bold text-[var(--sea-ink)]",
					children: "Aucune certification trouvée"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-[var(--sea-ink-soft)]",
					children: "Essayez de modifier votre recherche."
				})
			]
		})]
	});
}
//#endregion
export { Certifications as component };
