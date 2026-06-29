import { t as api } from "./api-BqX1M4Go.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Code2, Rocket, Target, User } from "lucide-react";
import { motion } from "framer-motion";
//#region src/routes/about.tsx?tsr-split=component
var timeline = [
	{
		year: "2022",
		title: "Découverte du développement web",
		desc: "Premiers pas en HTML, CSS, JavaScript et PHP."
	},
	{
		year: "2023",
		title: "Maîtrise de Laravel",
		desc: "Conception d'applications web complètes avec Laravel et MySQL."
	},
	{
		year: "2024",
		title: "Fullstack avec React",
		desc: "Développement d'interfaces modernes avec React et TypeScript."
	},
	{
		year: "2025+",
		title: "Architecture avancée",
		desc: "TanStack Start, API REST découplées, déploiement cloud."
	}
];
function About() {
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: () => api.get("/profile").then((r) => r.data)
	});
	const bio = profile?.bio || "Je suis un développeur Full-Stack passionné, spécialisé dans la création d'applications web et mobiles modernes, performantes et intuitives.\n\nMon approche combine rigueur technique et sens du détail visuel. Je construis des architectures découplées, robustes et hautement maintenables.";
	return /* @__PURE__ */ jsxs("main", {
		className: "page-wrap px-4 py-16",
		children: [
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
				className: "mb-12",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(User, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]",
						children: "À propos"
					})]
				}), /* @__PURE__ */ jsx("h1", {
					className: "mb-4 text-4xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-5xl",
					children: "Qui suis-je ?"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
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
					className: "lg:col-span-3",
					children: /* @__PURE__ */ jsx("div", {
						className: "island-shell rounded-2xl p-7",
						children: /* @__PURE__ */ jsx("div", {
							className: "text-base leading-8 text-[var(--sea-ink-soft)] whitespace-pre-wrap",
							children: bio
						})
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
					className: "flex flex-col gap-4 lg:col-span-2",
					children: [
						{
							icon: Code2,
							title: "Code propre",
							desc: "Des architectures maintenables et bien documentées."
						},
						{
							icon: Target,
							title: "Orienté résultats",
							desc: "Livraison de fonctionnalités qui apportent de la valeur."
						},
						{
							icon: Rocket,
							title: "Apprentissage continu",
							desc: "Toujours à l'affût des dernières technologies."
						}
					].map(({ icon: Icon, title, desc }, i) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .4,
							delay: .4 + i * .1
						},
						className: "island-shell flex items-start gap-4 rounded-2xl p-5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "mb-1 text-sm font-semibold text-[var(--sea-ink)]",
							children: title
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-[var(--sea-ink-soft)]",
							children: desc
						})] })]
					}, title))
				})]
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				className: "mt-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "mb-8 text-2xl font-bold text-[var(--sea-ink)]",
					children: "Mon parcours"
				}), /* @__PURE__ */ jsx("div", {
					className: "relative border-l-2 border-[rgba(79,184,178,0.3)] pl-6",
					children: timeline.map((item, i) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							x: -15
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: { delay: i * .1 },
						className: "relative mb-8 last:mb-0",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute -left-[1.85rem] h-3.5 w-3.5 rounded-full border-2 border-[var(--lagoon-deep)] bg-white" }),
							/* @__PURE__ */ jsx("span", {
								className: "mb-1 inline-block rounded-full border border-[rgba(79,184,178,0.3)] bg-[rgba(79,184,178,0.08)] px-2.5 py-0.5 text-xs font-semibold text-[var(--lagoon-deep)]",
								children: item.year
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-1.5 text-base font-semibold text-[var(--sea-ink)]",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-0.5 text-sm text-[var(--sea-ink-soft)]",
								children: item.desc
							})
						]
					}, item.year))
				})]
			})
		]
	});
}
//#endregion
export { About as component };
