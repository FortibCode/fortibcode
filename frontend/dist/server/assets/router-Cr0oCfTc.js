import { t as api } from "./api-Bq79bI1z.js";
import { t as Route$7 } from "./projects._slug-CF_rS3Ro.js";
import { useEffect, useState } from "react";
import { HeadContent, Link, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Github, Linkedin, Lock, Mail } from "lucide-react";
//#region src/components/Footer.tsx
function Footer() {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: () => api.get("/profile").then((r) => r.data)
	});
	const githubUrl = profile?.github_url || "https://github.com/okombifortune";
	const linkedinUrl = profile?.linkedin_url || "https://linkedin.com/in/fortune-okombi";
	return /* @__PURE__ */ jsxs("footer", {
		className: "mt-20 border-t border-[var(--line)] bg-[var(--header-bg)] px-4 pb-12 pt-16 text-[var(--sea-ink-soft)]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "page-wrap grid grid-cols-1 gap-10 md:grid-cols-12",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 md:col-span-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/logo.svg",
							alt: "FortibCode Logo",
							className: "h-9 w-9 rounded-full"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-sans text-lg font-bold tracking-tight text-[var(--sea-ink)]",
							children: "FortibCode"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "max-w-sm text-sm leading-relaxed",
						children: "Développeur Full-Stack passionné par la création d'expériences web modernes, robustes et centrées sur l'utilisateur."
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-3 md:col-span-3",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "text-xs font-bold uppercase tracking-widest text-[var(--sea-ink)]",
						children: "Navigation"
					}), /* @__PURE__ */ jsxs("nav", {
						className: "flex flex-col gap-2 text-sm font-medium",
						children: [
							/* @__PURE__ */ jsx(Link, {
								to: "/",
								className: "hover:text-[var(--sea-ink)] transition",
								children: "Accueil"
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/about",
								className: "hover:text-[var(--sea-ink)] transition",
								children: "À propos"
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/projects",
								className: "hover:text-[var(--sea-ink)] transition",
								children: "Projets"
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/certifications",
								className: "hover:text-[var(--sea-ink)] transition",
								children: "Certifications"
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "hover:text-[var(--sea-ink)] transition",
								children: "Contact"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 md:col-span-4",
					children: [
						/* @__PURE__ */ jsx("h4", {
							className: "text-xs font-bold uppercase tracking-widest text-[var(--sea-ink)]",
							children: "Contact & Réseaux"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex flex-col gap-2.5 text-sm font-medium",
							children: /* @__PURE__ */ jsxs("a", {
								href: "mailto:fortuneokombi@gmail.com",
								className: "flex items-center gap-2 hover:text-[var(--sea-ink)] transition",
								children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ jsx("span", { children: "okombifortune97@gmail.com" })]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-2 flex gap-3",
							children: [/* @__PURE__ */ jsx("a", {
								href: githubUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] shadow-sm transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
								title: "GitHub",
								children: /* @__PURE__ */ jsx(Github, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsx("a", {
								href: linkedinUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] text-[var(--sea-ink-soft)] shadow-sm transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
								title: "LinkedIn",
								children: /* @__PURE__ */ jsx(Linkedin, { className: "h-5 w-5" })
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "page-wrap mt-12 border-t border-[var(--line)] pt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "m-0 text-xs",
				children: [
					"© ",
					year,
					" Fortune Okombi. Tous droits réservés."
				]
			}), /* @__PURE__ */ jsx("p", {
				className: "m-0 text-xs text-[var(--sea-ink-soft)] opacity-80",
				children: "Créé avec soin et professionnalisme."
			})]
		})]
	});
}
//#endregion
//#region src/components/ThemeToggle.tsx
function getInitialMode() {
	if (typeof window === "undefined") return "auto";
	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark" || stored === "auto") return stored;
	return "auto";
}
function applyThemeMode(mode) {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const resolved = mode === "auto" ? prefersDark ? "dark" : "light" : mode;
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);
	if (mode === "auto") document.documentElement.removeAttribute("data-theme");
	else document.documentElement.setAttribute("data-theme", mode);
	document.documentElement.style.colorScheme = resolved;
}
function ThemeToggle() {
	const [mode, setMode] = useState("auto");
	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
	}, []);
	useEffect(() => {
		if (mode !== "auto") return;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyThemeMode("auto");
		media.addEventListener("change", onChange);
		return () => {
			media.removeEventListener("change", onChange);
		};
	}, [mode]);
	function toggleMode() {
		const nextMode = mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
		setMode(nextMode);
		applyThemeMode(nextMode);
		window.localStorage.setItem("theme", nextMode);
	}
	const label = mode === "auto" ? "Theme mode: auto (system). Click to switch to light mode." : `Theme mode: ${mode}. Click to switch mode.`;
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: toggleMode,
		"aria-label": label,
		title: label,
		className: "rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5",
		children: mode === "auto" ? "Auto" : mode === "dark" ? "Dark" : "Light"
	});
}
//#endregion
//#region src/components/Header.tsx
function Header() {
	return /* @__PURE__ */ jsx("header", {
		className: "sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg",
		children: /* @__PURE__ */ jsxs("nav", {
			className: "page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "m-0 flex-shrink-0 text-base font-semibold tracking-tight",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "inline-flex items-center gap-2.5 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2 hover:shadow-[0_8px_28px_rgba(79,184,178,0.18)] transition-all",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/logo.svg",
							alt: "FortibCode Logo",
							className: "h-7 w-7 rounded-full"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold tracking-tight",
							children: "FortibCode"
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "nav-link",
							activeProps: { className: "nav-link is-active" },
							children: "Accueil"
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/about",
							className: "nav-link",
							activeProps: { className: "nav-link is-active" },
							children: "À propos"
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/projects",
							className: "nav-link",
							activeProps: { className: "nav-link is-active" },
							children: "Projets"
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/certifications",
							className: "nav-link",
							activeProps: { className: "nav-link is-active" },
							children: "Certifications"
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "nav-link",
							activeProps: { className: "nav-link is-active" },
							children: "Contact"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "ml-auto flex items-center gap-1.5 sm:gap-2",
					children: [
						/* @__PURE__ */ jsxs("a", {
							href: "https://linkedin.com/in/fortune-okombi",
							target: "_blank",
							rel: "noreferrer",
							className: "hidden rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] sm:block",
							title: "LinkedIn",
							children: [/* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "LinkedIn"
							}), /* @__PURE__ */ jsx(Linkedin, { className: "h-5 w-5" })]
						}),
						/* @__PURE__ */ jsxs("a", {
							href: "https://github.com/okombifortune",
							target: "_blank",
							rel: "noreferrer",
							className: "hidden rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] sm:block",
							title: "GitHub",
							children: [/* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "GitHub"
							}), /* @__PURE__ */ jsx(Github, { className: "h-5 w-5" })]
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/admin",
							className: "rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
							title: "Administration",
							children: /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx(ThemeToggle, {})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-CT6a-IBP.css";
//#endregion
//#region src/routes/__root.tsx
var THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "FortibCode — Développeur Full-Stack | Fortune Okombi" },
			{
				name: "description",
				content: "Portfolio de Fortune Okombi, développeur Full-Stack spécialisé en Laravel, React, TypeScript et React Native. Disponible pour des opportunités freelance."
			},
			{
				name: "author",
				content: "OKOMBI Béni Fortune Serge"
			},
			{
				name: "robots",
				content: "index, follow"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:title",
				content: "FortibCode — Développeur Full-Stack"
			},
			{
				property: "og:description",
				content: "Portfolio professionnel de Fortune Okombi. Laravel, React, TypeScript, React Native."
			},
			{
				property: "og:image",
				content: "/logo.svg"
			},
			{
				property: "og:locale",
				content: "fr_FR"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "FortibCode — Développeur Full-Stack"
			},
			{
				name: "twitter:description",
				content: "Portfolio professionnel de Fortune Okombi."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "32x32"
			},
			{
				rel: "apple-touch-icon",
				href: "/logo192.png"
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			}
		]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "fr",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsxs("head", { children: [/* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: THEME_INIT_SCRIPT } }), /* @__PURE__ */ jsx(HeadContent, {})] }), /* @__PURE__ */ jsxs("body", {
			className: "font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]",
			children: [
				/* @__PURE__ */ jsx(Header, {}),
				children,
				/* @__PURE__ */ jsx(Footer, {}),
				/* @__PURE__ */ jsx(Scripts, {})
			]
		})]
	});
}
//#endregion
//#region src/routes/projects.tsx
var $$splitComponentImporter$5 = () => import("./projects-DgiuT12F.js");
var Route$5 = createFileRoute("/projects")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Mes Projets | Mon Portfolio" }, {
		name: "description",
		content: "Découvrez mes réalisations web. Une galerie d'applications modernes développées avec des technologies de pointe."
	}] })
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$4 = () => import("./contact-BBKN8vpv.js");
var Route$4 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Contact | FortibCode — Fortune Okombi" }, {
		name: "description",
		content: "Prenez contact avec moi pour discuter de vos projets, de collaborations professionnelles ou pour toute autre question."
	}] })
});
//#endregion
//#region src/routes/certifications.tsx
var $$splitComponentImporter$3 = () => import("./certifications-9CKc8CUe.js");
var Route$3 = createFileRoute("/certifications")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Certifications | Mon Portfolio" }, {
		name: "description",
		content: "Consultez la liste de mes diplômes et certifications techniques validés auprès d'organismes leaders de l'industrie."
	}] })
});
//#endregion
//#region src/routes/admin.tsx
var $$splitComponentImporter$2 = () => import("./admin-DEMdQFiK.js");
var Route$2 = createFileRoute("/admin")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Administration | Mon Portfolio" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] })
});
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$1 = () => import("./about-BgwGnfB3.js");
var Route$1 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "À propos | FortibCode — Fortune Okombi" }, {
		name: "description",
		content: "Découvrez mon parcours professionnel, mon expertise technique, mes valeurs de travail et mes compétences de développeur."
	}] })
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-7wZ9labe.js");
var Route = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "FortibCode — Développeur Full-Stack | Fortune Okombi" }, {
		name: "description",
		content: "Bienvenue sur mon portfolio professionnel. Je suis un développeur Full-Stack spécialisé en React, TanStack Start et Laravel."
	}] })
});
//#endregion
//#region src/routeTree.gen.ts
var ProjectsRoute = Route$5.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$6
});
var ContactRoute = Route$4.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$6
});
var CertificationsRoute = Route$3.update({
	id: "/certifications",
	path: "/certifications",
	getParentRoute: () => Route$6
});
var AdminRoute = Route$2.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$6
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$6
});
var IndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var ProjectsRouteChildren = { ProjectsSlugRoute: Route$7.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ProjectsRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute,
	CertificationsRoute,
	ContactRoute,
	ProjectsRoute: ProjectsRoute._addFileChildren(ProjectsRouteChildren)
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var queryClient = new QueryClient({ defaultOptions: { queries: {
	retry: 1,
	staleTime: 3e4
} } });
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		Wrap: ({ children }) => /* @__PURE__ */ jsx(QueryClientProvider, {
			client: queryClient,
			children
		})
	});
}
//#endregion
export { getRouter };
