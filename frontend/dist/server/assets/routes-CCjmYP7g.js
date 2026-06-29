import { t as api } from "./api-BqX1M4Go.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Code2, ExternalLink, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
//#region src/routes/index.tsx?tsr-split=component
var skills = [
	{
		name: "Laravel",
		category: "Backend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg"
	},
	{
		name: "PHP",
		category: "Backend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
	},
	{
		name: "React / Next.js",
		category: "Frontend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
	},
	{
		name: "TypeScript",
		category: "Frontend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
	},
	{
		name: "React Native",
		category: "Mobile",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
	},
	{
		name: "Flutter / Dart",
		category: "Mobile",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
	},
	{
		name: "Tailwind CSS",
		category: "Frontend",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
	},
	{
		name: "MySQL / PostgreSQL",
		category: "Database",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
	},
	{
		name: "Git & Docker",
		category: "Tools",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
	}
];
var containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: .1 }
	}
};
var itemVariants = {
	hidden: {
		opacity: 0,
		y: 20
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: .5 }
	}
};
function Home() {
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: () => api.get("/profile").then((r) => r.data)
	});
	const { data: dbSkills } = useQuery({
		queryKey: ["skills"],
		queryFn: () => api.get("/skills").then((r) => r.data)
	});
	const heroTitle = profile?.title || "Web & Mobile";
	const heroBio = profile?.bio || "Je conçois et développe des applications web et mobiles sur-mesure, performantes et esthétiques. En associant des backends robustes à des interfaces utilisateur fluides, je maîtrise un écosystème technologique moderne pour concrétiser vos projets les plus ambitieux.";
	const githubUrl = profile?.github_url || "https://github.com/okombifortune";
	const linkedinUrl = profile?.linkedin_url || "https://linkedin.com/in/fortune-okombi";
	const displayedSkills = dbSkills && dbSkills.length > 0 ? dbSkills.map((s) => ({
		name: s.name,
		category: s.category?.name || "Général",
		icon: s.icon || "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
	})) : skills;
	return /* @__PURE__ */ jsxs("main", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "pointer-events-none fixed inset-0 -z-10",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.15),transparent_70%)]" }),
					/* @__PURE__ */ jsx("div", { className: "absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.1),transparent_70%)]" }),
					/* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.12),transparent_70%)]" })
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "page-wrap min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-16 px-4 py-20",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					variants: containerVariants,
					initial: "hidden",
					animate: "visible",
					className: "flex-1 max-w-2xl text-left",
					children: [
						/* @__PURE__ */ jsx(motion.div, {
							variants: itemVariants,
							className: "mb-6 flex items-center gap-2",
							children: /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-[rgba(79,184,178,0.3)] bg-[rgba(79,184,178,0.08)] px-3 py-1 text-sm font-medium text-[var(--sea-ink-soft)]",
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-[var(--lagoon-deep)]" }), "Disponible pour des opportunités"]
							})
						}),
						/* @__PURE__ */ jsxs(motion.h1, {
							variants: itemVariants,
							className: "mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--sea-ink)] sm:text-7xl",
							children: [
								heroTitle.includes(" ") ? /* @__PURE__ */ jsxs(Fragment, { children: [
									heroTitle.split(" ")[0],
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "bg-gradient-to-r from-[#4fb8b2] via-[#5a8dee] to-[#7c6dd0] bg-clip-text text-transparent",
										children: heroTitle.split(" ").slice(1).join(" ")
									})
								] }) : /* @__PURE__ */ jsx("span", {
									className: "bg-gradient-to-r from-[#4fb8b2] via-[#5a8dee] to-[#7c6dd0] bg-clip-text text-transparent",
									children: heroTitle
								}),
								/* @__PURE__ */ jsx("br", {}),
								"passionné"
							]
						}),
						/* @__PURE__ */ jsx(motion.p, {
							variants: itemVariants,
							className: "mb-10 max-w-xl text-lg leading-relaxed text-[var(--sea-ink-soft)]",
							children: heroBio
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							variants: itemVariants,
							className: "flex flex-wrap gap-4",
							children: [/* @__PURE__ */ jsxs(Link, {
								to: "/projects",
								className: "group inline-flex items-center gap-2 rounded-full bg-[var(--sea-ink)] px-6 py-3 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(23,58,64,0.3)]",
								children: ["Voir mes projets", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							}), /* @__PURE__ */ jsxs(Link, {
								to: "/contact",
								className: "inline-flex items-center gap-2 rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-6 py-3 text-sm font-semibold text-[var(--sea-ink)] no-underline transition-all hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.4)] hover:bg-white/80",
								children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }), "Me contacter"]
							})]
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							variants: itemVariants,
							className: "mt-8 flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("a", {
								href: githubUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-xl p-2.5 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
								children: /* @__PURE__ */ jsx(Github, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsx("a", {
								href: linkedinUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-xl p-2.5 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
								children: /* @__PURE__ */ jsx(Linkedin, { className: "h-5 w-5" })
							})]
						})
					]
				}), /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						scale: .85
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: .6,
						delay: .3
					},
					className: "flex-shrink-0 flex items-center justify-center lg:justify-end w-full lg:w-auto",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx("div", { className: "absolute -inset-2.5 rounded-full bg-gradient-to-r from-[#4fb8b2] via-[#5a8dee] to-[#7c6dd0] opacity-35 blur-xl animate-pulse" }), /* @__PURE__ */ jsx("div", {
								className: "relative h-64 w-64 sm:h-80 sm:w-80 rounded-full border-4 border-white/95 dark:border-[var(--card-bg)] shadow-[0_20px_50px_rgba(30,90,72,0.15)] overflow-hidden bg-[var(--card-bg)]",
								children: /* @__PURE__ */ jsx("img", {
									src: "/fortune.jpg",
									alt: "OKOMBI Béni Fortune Serge",
									className: "h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
								})
							})]
						}), /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .5,
								delay: .55
							},
							className: "text-center",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "m-0 font-sans text-xl font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-2xl",
								children: "OKOMBI Béni Fortune Serge"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] opacity-85",
								children: heroTitle
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "page-wrap px-4 py-20",
				children: /* @__PURE__ */ jsxs(motion.div, {
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
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Code2, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ jsx("span", {
								className: "text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]",
								children: "Compétences"
							})]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-10 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl",
							children: "Technologies maîtrisées"
						}),
						/* @__PURE__ */ jsx(motion.div, {
							variants: containerVariants,
							initial: "hidden",
							whileInView: "visible",
							viewport: { once: true },
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3",
							children: displayedSkills.map((skill) => /* @__PURE__ */ jsx(motion.div, {
								variants: itemVariants,
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4.5 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] dark:bg-[var(--chip-bg)] p-4 shadow-sm transition hover:border-[rgba(79,184,178,0.4)] hover:bg-[var(--link-bg-hover)] hover:-translate-y-0.5 cursor-default",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--sand)] dark:bg-[var(--surface)] p-2.5",
										children: /* @__PURE__ */ jsx("img", {
											src: skill.icon,
											alt: skill.name,
											className: "h-full w-full object-contain",
											onError: (e) => {
												e.currentTarget.style.display = "none";
											}
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-0.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-sm text-[var(--sea-ink)] leading-tight",
											children: skill.name
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[10px] font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] opacity-70",
											children: skill.category
										})]
									})]
								})
							}, skill.name))
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "page-wrap px-4 pb-20",
				children: /* @__PURE__ */ jsxs(motion.div, {
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
					className: "island-shell overflow-hidden rounded-3xl p-10 text-center sm:p-14",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "pointer-events-none absolute inset-0 -z-10",
							children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[rgba(79,184,178,0.05)] to-[rgba(99,102,241,0.05)]" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-4 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl",
							children: "Travaillons ensemble !"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-8 text-[var(--sea-ink-soft)]",
							children: "Vous avez un projet en tête ? Je suis disponible pour de nouveaux défis."
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/contact",
							className: "group inline-flex items-center gap-2 rounded-full bg-[var(--sea-ink)] px-8 py-3.5 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[rgba(23,58,64,0.25)]",
							children: ["Démarrer une conversation", /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
