import { t as api } from "./api-Bq79bI1z.js";
import { n as Input, r as Button, t as Textarea } from "./textarea-CTNW_4Ot.js";
import { t as Badge } from "./badge-DVIKFGgX.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Award, Check, Code2, FolderKanban, Lock, LogOut, Mail, MessageSquare, Pencil, Plus, Trash2, Upload, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//#region src/routes/admin.tsx?tsr-split=component
function getToken() {
	return localStorage.getItem("auth_token");
}
function setToken(t) {
	localStorage.setItem("auth_token", t);
}
function clearToken() {
	localStorage.removeItem("auth_token");
}
function LoginForm({ onSuccess }) {
	const [creds, setCreds] = useState({
		email: "",
		password: ""
	});
	const [error, setError] = useState("");
	const mutation = useMutation({
		mutationFn: () => api.post("/login", creds),
		onSuccess: (res) => {
			setToken(res.data.access_token);
			onSuccess();
		},
		onError: () => setError("Email ou mot de passe invalide.")
	});
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-[80vh] items-center justify-center px-4",
		children: /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "island-shell w-full max-w-sm rounded-2xl p-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex flex-col items-center gap-3 text-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(79,184,178,0.12)] text-[var(--lagoon-deep)]",
						children: /* @__PURE__ */ jsx(Lock, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-xl font-bold text-[var(--sea-ink)]",
						children: "Espace Administration"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-[var(--sea-ink-soft)]",
						children: "Connexion requise pour accéder au tableau de bord."
					})
				]
			}), /* @__PURE__ */ jsxs("form", {
				onSubmit: (e) => {
					e.preventDefault();
					mutation.mutate();
				},
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium text-[var(--sea-ink)]",
							children: "Email"
						}), /* @__PURE__ */ jsx(Input, {
							type: "email",
							required: true,
							placeholder: "fortuneokombi@gmail.com",
							value: creds.email,
							onChange: (e) => setCreds({
								...creds,
								email: e.target.value
							}),
							className: "rounded-xl"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium text-[var(--sea-ink)]",
							children: "Mot de passe"
						}), /* @__PURE__ */ jsx(Input, {
							type: "password",
							required: true,
							placeholder: "••••••••",
							value: creds.password,
							onChange: (e) => setCreds({
								...creds,
								password: e.target.value
							}),
							className: "rounded-xl"
						})]
					}),
					error && /* @__PURE__ */ jsx("p", {
						className: "text-sm text-red-500",
						children: error
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: mutation.isPending,
						className: "mt-2 rounded-xl bg-[var(--sea-ink)] py-2.5 font-semibold text-white",
						children: mutation.isPending ? "Connexion..." : "Se connecter"
					})
				]
			})]
		})
	});
}
function Dashboard({ onLogout }) {
	const [tab, setTab] = useState("projects");
	const qc = useQueryClient();
	const { data: projects = [], isLoading: loadingProjects } = useQuery({
		queryKey: ["admin-projects"],
		queryFn: () => api.get("/projects").then((r) => r.data)
	});
	const { data: messages = [], isLoading: loadingMessages } = useQuery({
		queryKey: ["admin-messages"],
		queryFn: () => api.get("/messages").then((r) => r.data)
	});
	const { data: certifications = [], isLoading: loadingCertifications } = useQuery({
		queryKey: ["admin-certifications"],
		queryFn: () => api.get("/certifications").then((r) => r.data)
	});
	const { data: skills = [], isLoading: loadingSkills } = useQuery({
		queryKey: ["admin-skills"],
		queryFn: () => api.get("/skills").then((r) => r.data)
	});
	const { data: categories = [] } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: () => api.get("/categories").then((r) => r.data)
	});
	const { data: profile } = useQuery({
		queryKey: ["admin-profile"],
		queryFn: () => api.get("/profile").then((r) => r.data)
	});
	const [activeProject, setActiveProject] = useState(null);
	const [activeCert, setActiveCert] = useState(null);
	const [activeSkill, setActiveSkill] = useState(null);
	const [activeCategory, setActiveCategory] = useState(null);
	const deleteProject = useMutation({
		mutationFn: (id) => api.delete(`/projects/${id}`),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] })
	});
	const deleteCert = useMutation({
		mutationFn: (id) => api.delete(`/certifications/${id}`),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-certifications"] })
	});
	const deleteSkill = useMutation({
		mutationFn: (id) => api.delete(`/skills/${id}`),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-skills"] })
	});
	const deleteCategory = useMutation({
		mutationFn: (id) => api.delete(`/categories/${id}`),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-categories"] });
			qc.invalidateQueries({ queryKey: ["admin-skills"] });
		}
	});
	const toggleRead = useMutation({
		mutationFn: ({ id, is_read }) => api.put(`/messages/${id}`, { is_read }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] })
	});
	const deleteMessage = useMutation({
		mutationFn: (id) => api.delete(`/messages/${id}`),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] })
	});
	const unread = messages.filter((m) => !m.is_read).length;
	return /* @__PURE__ */ jsxs("main", {
		className: "page-wrap px-4 py-10",
		children: [
			/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: -10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "mb-8 flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-[var(--sea-ink)]",
					children: "Tableau de bord"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-[var(--sea-ink-soft)]",
					children: "Gérez votre portfolio professionnel"
				})] }), /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					onClick: onLogout,
					className: "flex items-center gap-2 rounded-xl text-sm",
					children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }), "Déconnexion"]
				})]
			}),
			/* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .1 },
				className: "mb-8 grid gap-4 grid-cols-2 sm:grid-cols-4",
				children: [
					{
						icon: FolderKanban,
						label: "Projets",
						value: projects.length,
						color: "rgba(79,184,178,0.12)",
						text: "var(--lagoon-deep)"
					},
					{
						icon: Award,
						label: "Certifs",
						value: certifications.length,
						color: "rgba(168,85,247,0.12)",
						text: "#a855f7"
					},
					{
						icon: Code2,
						label: "Compétences",
						value: skills.length,
						color: "rgba(234,179,8,0.12)",
						text: "#ca8a04"
					},
					{
						icon: Mail,
						label: "Messages non lus",
						value: unread,
						color: "rgba(239,68,68,0.1)",
						text: "#ef4444"
					}
				].map(({ icon: Icon, label, value, color, text }) => /* @__PURE__ */ jsxs("div", {
					className: "island-shell flex items-center gap-3 sm:gap-4 rounded-2xl p-4 sm:p-5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl",
						style: {
							background: color,
							color: text
						},
						children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-xl sm:text-2xl font-bold text-[var(--sea-ink)]",
						children: value
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs sm:text-sm text-[var(--sea-ink-soft)] line-clamp-1",
						children: label
					})] })]
				}, label))
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { delay: .2 },
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mb-6 flex flex-wrap gap-2 border-b border-[var(--line)] pb-4",
						children: [
							{
								key: "projects",
								label: "Projets",
								icon: FolderKanban
							},
							{
								key: "certifications",
								label: "Certifications",
								icon: Award
							},
							{
								key: "skills",
								label: "Compétences",
								icon: Code2
							},
							{
								key: "profile",
								label: "Profil & Liens",
								icon: User
							},
							{
								key: "messages",
								label: "Messages",
								icon: MessageSquare,
								badge: unread
							}
						].map(({ key, label, icon: Icon, badge }) => /* @__PURE__ */ jsxs("button", {
							onClick: () => setTab(key),
							className: `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${tab === key ? "bg-[var(--sea-ink)] text-white shadow-sm" : "text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)]"}`,
							children: [
								/* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
								label,
								badge !== void 0 && badge > 0 && /* @__PURE__ */ jsx("span", {
									className: "flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ml-1",
									children: badge
								})
							]
						}, key))
					}),
					tab === "projects" && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-[var(--sea-ink)]",
							children: "Mes Projets"
						}), /* @__PURE__ */ jsxs(Button, {
							onClick: () => setActiveProject("new"),
							className: "flex items-center gap-2 rounded-xl bg-[var(--sea-ink)] text-sm text-white",
							children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), "Nouveau projet"]
						})]
					}), loadingProjects ? /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ jsx("div", { className: "island-shell h-16 animate-pulse rounded-xl" }, i))
					}) : projects.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "island-shell flex flex-col items-center justify-center rounded-2xl py-16 text-center",
						children: [
							/* @__PURE__ */ jsx(FolderKanban, { className: "mb-3 h-10 w-10 text-[var(--sea-ink-soft)]" }),
							/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-[var(--sea-ink)]",
								children: "Aucun projet"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-[var(--sea-ink-soft)]",
								children: "Créez votre premier projet ci-dessus."
							})
						]
					}) : /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: projects.map((p) => /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								x: -10
							},
							animate: {
								opacity: 1,
								x: 0
							},
							className: "island-shell flex items-center justify-between rounded-xl p-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "h-10 w-10 overflow-hidden rounded-lg bg-[rgba(79,184,178,0.1)] flex items-center justify-center flex-shrink-0",
									children: p.image ? /* @__PURE__ */ jsx("img", {
										src: p.image,
										alt: p.title,
										className: "h-full w-full object-cover"
									}) : /* @__PURE__ */ jsx("span", {
										className: "text-lg font-bold text-[rgba(79,184,178,0.4)]",
										children: p.title.charAt(0)
									})
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-semibold text-[var(--sea-ink)]",
									children: p.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-[var(--sea-ink-soft)] line-clamp-1 max-w-[200px] sm:max-w-md",
									children: p.description
								})] })]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx(Badge, {
										variant: p.is_published ? "default" : "secondary",
										className: `rounded-full text-xs ${p.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`,
										children: p.is_published ? "Publié" : "Brouillon"
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => setActiveProject(p),
										className: "rounded-lg p-1.5 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
										title: "Modifier",
										children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => {
											if (confirm("Supprimer ce projet ?")) deleteProject.mutate(p.id);
										},
										className: "rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600",
										title: "Supprimer",
										children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
									})
								]
							})]
						}, p.id))
					})] }),
					tab === "certifications" && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-[var(--sea-ink)]",
							children: "Certifications"
						}), /* @__PURE__ */ jsxs(Button, {
							onClick: () => setActiveCert("new"),
							className: "flex items-center gap-2 rounded-xl bg-[var(--sea-ink)] text-sm text-white",
							children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), "Nouvelle certification"]
						})]
					}), loadingCertifications ? /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ jsx("div", { className: "island-shell h-16 animate-pulse rounded-xl" }, i))
					}) : certifications.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "island-shell flex flex-col items-center justify-center rounded-2xl py-16 text-center",
						children: [
							/* @__PURE__ */ jsx(Award, { className: "mb-3 h-10 w-10 text-[var(--sea-ink-soft)]" }),
							/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-[var(--sea-ink)]",
								children: "Aucune certification"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-[var(--sea-ink-soft)]",
								children: "Ajoutez vos diplômes ou certifications."
							})
						]
					}) : /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: certifications.map((c) => /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								x: -10
							},
							animate: {
								opacity: 1,
								x: 0
							},
							className: "island-shell flex items-center justify-between rounded-xl p-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-semibold text-[var(--sea-ink)]",
									children: c.name
								}), c.image && /* @__PURE__ */ jsx("span", {
									className: "rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
									children: "Document joint"
								})]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-[var(--sea-ink-soft)]",
								children: [
									c.issuer,
									" — ",
									c.issue_date
								]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveCert(c),
									className: "rounded-lg p-1.5 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
									title: "Modifier",
									children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => {
										if (confirm("Supprimer cette certification ?")) deleteCert.mutate(c.id);
									},
									className: "rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600",
									title: "Supprimer",
									children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
								})]
							})]
						}, c.id))
					})] }),
					tab === "skills" && /* @__PURE__ */ jsxs("div", {
						className: "grid gap-8 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-[var(--sea-ink)]",
								children: "Catégories"
							}), /* @__PURE__ */ jsxs(Button, {
								onClick: () => setActiveCategory("new"),
								size: "sm",
								variant: "outline",
								className: "rounded-xl text-xs",
								children: [/* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3.5 w-3.5" }), " Nouvelle"]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-2",
							children: categories.map((cat) => /* @__PURE__ */ jsxs("div", {
								className: "island-shell flex items-center justify-between rounded-xl p-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: cat.name
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-1",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => setActiveCategory(cat),
										className: "rounded-lg p-1 text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
										children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => {
											if (confirm("Supprimer cette catégorie ? Cela supprimera aussi les compétences associées.")) deleteCategory.mutate(cat.id);
										},
										className: "rounded-lg p-1 text-red-400 hover:bg-red-50",
										children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
									})]
								})]
							}, cat.id))
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-[var(--sea-ink)]",
								children: "Compétences"
							}), /* @__PURE__ */ jsxs(Button, {
								onClick: () => setActiveSkill("new"),
								size: "sm",
								className: "rounded-xl text-xs bg-[var(--sea-ink)] text-white",
								children: [/* @__PURE__ */ jsx(Plus, { className: "mr-1 h-3.5 w-3.5" }), " Nouvelle"]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-2",
							children: loadingSkills ? /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-400",
								children: "Chargement..."
							}) : skills.length === 0 ? /* @__PURE__ */ jsx("p", {
								className: "text-sm text-[var(--sea-ink-soft)]",
								children: "Aucune compétence."
							}) : skills.map((skill) => /* @__PURE__ */ jsxs("div", {
								className: "island-shell flex items-center justify-between rounded-xl p-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sand)] dark:bg-[var(--surface)] p-2",
										children: skill.icon ? /* @__PURE__ */ jsx("img", {
											src: skill.icon,
											alt: skill.name,
											className: "h-full w-full object-contain"
										}) : /* @__PURE__ */ jsx(Code2, { className: "h-5 w-5 text-[var(--sea-ink-soft)] opacity-60" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm font-semibold text-[var(--sea-ink)]",
										children: skill.name
									}), /* @__PURE__ */ jsx("span", {
										className: "ml-2 rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-gray-400 font-semibold",
										children: skill.category?.name
									})] })]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [skill.proficiency && /* @__PURE__ */ jsxs("span", {
										className: "text-xs font-mono text-[var(--sea-ink-soft)]",
										children: [skill.proficiency, "%"]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex gap-1",
										children: [/* @__PURE__ */ jsx("button", {
											onClick: () => setActiveSkill(skill),
											className: "rounded-lg p-1 text-[var(--sea-ink-soft)] hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]",
											children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" })
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => {
												if (confirm("Supprimer cette compétence ?")) deleteSkill.mutate(skill.id);
											},
											className: "rounded-lg p-1 text-red-400 hover:bg-red-50",
											children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
										})]
									})]
								})]
							}, skill.id))
						})] })]
					}),
					tab === "profile" && /* @__PURE__ */ jsx("div", {
						className: "island-shell max-w-2xl rounded-2xl p-6 sm:p-8",
						children: /* @__PURE__ */ jsx(ProfileForm, { initialProfile: profile })
					}),
					tab === "messages" && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "mb-4 text-lg font-semibold text-[var(--sea-ink)]",
						children: "Messages reçus"
					}), loadingMessages ? /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ jsx("div", { className: "island-shell h-20 animate-pulse rounded-xl" }, i))
					}) : messages.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "island-shell flex flex-col items-center justify-center rounded-2xl py-16 text-center",
						children: [/* @__PURE__ */ jsx(MessageSquare, { className: "mb-3 h-10 w-10 text-[var(--sea-ink-soft)]" }), /* @__PURE__ */ jsx("p", {
							className: "font-semibold text-[var(--sea-ink)]",
							children: "Aucun message"
						})]
					}) : /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: messages.map((msg) => /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								x: -10
							},
							animate: {
								opacity: 1,
								x: 0
							},
							className: `island-shell rounded-xl p-4 ${!msg.is_read ? "border-l-2 border-[var(--lagoon-deep)]" : ""}`,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "mb-2 flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-semibold text-[var(--sea-ink)]",
										children: msg.name
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-[var(--sea-ink-soft)]",
										children: msg.email
									})] }), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [!msg.is_read && /* @__PURE__ */ jsx("button", {
											onClick: () => toggleRead.mutate({
												id: msg.id,
												is_read: true
											}),
											className: "rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--lagoon-deep)] transition hover:bg-[rgba(79,184,178,0.1)]",
											children: "Marquer lu"
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => {
												if (confirm("Supprimer ce message ?")) deleteMessage.mutate(msg.id);
											},
											className: "rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600",
											children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "mb-1 text-xs font-medium text-[var(--sea-ink-soft)]",
									children: ["Sujet : ", msg.subject]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-[var(--sea-ink-soft)] whitespace-pre-wrap",
									children: msg.message
								})
							]
						}, msg.id))
					})] })
				]
			}),
			/* @__PURE__ */ jsxs(AnimatePresence, { children: [
				activeProject && /* @__PURE__ */ jsx(ProjectModal, {
					project: activeProject === "new" ? null : activeProject,
					skills,
					onClose: () => setActiveProject(null),
					onSaved: () => {
						qc.invalidateQueries({ queryKey: ["admin-projects"] });
						setActiveProject(null);
					}
				}),
				activeCert && /* @__PURE__ */ jsx(CertModal, {
					certification: activeCert === "new" ? null : activeCert,
					onClose: () => setActiveCert(null),
					onSaved: () => {
						qc.invalidateQueries({ queryKey: ["admin-certifications"] });
						setActiveCert(null);
					}
				}),
				activeSkill && /* @__PURE__ */ jsx(SkillModal, {
					skill: activeSkill === "new" ? null : activeSkill,
					categories,
					onClose: () => setActiveSkill(null),
					onSaved: () => {
						qc.invalidateQueries({ queryKey: ["admin-skills"] });
						setActiveSkill(null);
					}
				}),
				activeCategory && /* @__PURE__ */ jsx(CategoryModal, {
					category: activeCategory === "new" ? null : activeCategory,
					onClose: () => setActiveCategory(null),
					onSaved: () => {
						qc.invalidateQueries({ queryKey: ["admin-categories"] });
						setActiveCategory(null);
					}
				})
			] })
		]
	});
}
function ProjectModal({ project, skills, onClose, onSaved }) {
	const [form, setForm] = useState({
		title: "",
		slug: "",
		description: "",
		content: "",
		image: "",
		url: "",
		github_url: "",
		is_published: false,
		skills: []
	});
	const [isUploading, setIsUploading] = useState(false);
	useEffect(() => {
		if (project) setForm({
			title: project.title,
			slug: project.slug,
			description: project.description || "",
			content: project.content || "",
			image: project.image || "",
			url: project.url || "",
			github_url: project.github_url || "",
			is_published: project.is_published,
			skills: project.skills ? project.skills.map((s) => s.id) : []
		});
	}, [project]);
	const handleTitleChange = (val) => {
		setForm((prev) => ({
			...prev,
			title: val,
			slug: prev.slug === "" || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-") : prev.slug
		}));
	};
	const handleFileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const formData = new FormData();
		formData.append("image", file);
		try {
			setIsUploading(true);
			const res = await api.post("/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
			setForm((prev) => ({
				...prev,
				image: res.data.url
			}));
		} catch (err) {
			alert("Erreur lors du téléchargement de l'image.");
		} finally {
			setIsUploading(false);
		}
	};
	const toggleSkill = (skillId) => {
		setForm((prev) => ({
			...prev,
			skills: prev.skills.includes(skillId) ? prev.skills.filter((id) => id !== skillId) : [...prev.skills, skillId]
		}));
	};
	const mutation = useMutation({
		mutationFn: () => {
			if (project) return api.put(`/projects/${project.id}`, form);
			return api.post("/projects", form);
		},
		onSuccess: onSaved,
		onError: () => alert("Erreur lors de la sauvegarde du projet. Vérifiez le slug ou les champs.")
	});
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm overflow-y-auto",
		children: /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			className: "island-shell w-full max-w-2xl rounded-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ jsx("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-xl p-1.5 hover:bg-gray-100",
					children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-gray-500" })
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-xl font-bold text-[var(--sea-ink)] mb-6",
					children: project ? "Modifier le Projet" : "Nouveau Projet"
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => {
						e.preventDefault();
						mutation.mutate();
					},
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "Titre"
								}), /* @__PURE__ */ jsx(Input, {
									required: true,
									value: form.title,
									onChange: (e) => handleTitleChange(e.target.value),
									placeholder: "Mon super projet"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "Slug"
								}), /* @__PURE__ */ jsx(Input, {
									required: true,
									value: form.slug,
									onChange: (e) => setForm({
										...form,
										slug: e.target.value
									}),
									placeholder: "mon-super-projet"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Description courte"
							}), /* @__PURE__ */ jsx(Input, {
								value: form.description,
								onChange: (e) => setForm({
									...form,
									description: e.target.value
								}),
								placeholder: "Une courte description résumant le projet..."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Contenu détaillé"
							}), /* @__PURE__ */ jsx(Textarea, {
								rows: 5,
								value: form.content,
								onChange: (e) => setForm({
									...form,
									content: e.target.value
								}),
								placeholder: "Description complète, défis rencontrés, technologies, etc.",
								className: "font-sans"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 sm:grid-cols-2 items-end",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "URL de l'image"
								}), /* @__PURE__ */ jsx(Input, {
									value: form.image,
									onChange: (e) => setForm({
										...form,
										image: e.target.value
									}),
									placeholder: "https://..."
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-col gap-1.5",
								children: /* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] py-2.5 px-4 text-sm font-semibold text-[var(--sea-ink)] cursor-pointer justify-center hover:bg-[var(--link-bg-hover)] transition",
									children: [
										/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
										isUploading ? "Téléchargement..." : "Téléverser un fichier",
										/* @__PURE__ */ jsx("input", {
											type: "file",
											accept: "image/*",
											onChange: handleFileUpload,
											className: "hidden"
										})
									]
								})
							})]
						}),
						form.image && /* @__PURE__ */ jsxs("div", {
							className: "h-28 w-44 overflow-hidden rounded-xl border border-[var(--line)] relative",
							children: [/* @__PURE__ */ jsx("img", {
								src: form.image,
								alt: "Prévisualisation",
								className: "h-full w-full object-cover"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									image: ""
								}),
								className: "absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600",
								children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "URL Démo Live"
								}), /* @__PURE__ */ jsx(Input, {
									value: form.url,
									onChange: (e) => setForm({
										...form,
										url: e.target.value
									}),
									placeholder: "https://..."
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "URL GitHub"
								}), /* @__PURE__ */ jsx(Input, {
									value: form.github_url,
									onChange: (e) => setForm({
										...form,
										github_url: e.target.value
									}),
									placeholder: "https://github.com/..."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Compétences associées"
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border border-[var(--line)] rounded-xl",
								children: skills.map((s) => /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => toggleSkill(s.id),
									className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${form.skills.includes(s.id) ? "bg-[var(--sea-ink)] text-white border-transparent" : "bg-transparent text-[var(--sea-ink-soft)] border-[var(--line)] hover:bg-gray-50"}`,
									children: [form.skills.includes(s.id) && /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }), s.name]
								}, s.id))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 pt-2",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								id: "is_published",
								checked: form.is_published,
								onChange: (e) => setForm({
									...form,
									is_published: e.target.checked
								}),
								className: "h-4 w-4 rounded text-[var(--lagoon-deep)]"
							}), /* @__PURE__ */ jsx("label", {
								htmlFor: "is_published",
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Publier directement ce projet (le rendre visible sur le portfolio)"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-2 pt-4 border-t border-[var(--line)]",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: onClose,
								className: "rounded-xl",
								children: "Annuler"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: mutation.isPending,
								className: "rounded-xl bg-[var(--sea-ink)] text-white font-semibold px-6",
								children: mutation.isPending ? "Sauvegarde..." : "Enregistrer"
							})]
						})
					]
				})
			]
		})
	});
}
function CertModal({ certification, onClose, onSaved }) {
	const [form, setForm] = useState({
		name: "",
		issuer: "",
		issue_date: "",
		expiration_date: "",
		credential_id: "",
		credential_url: "",
		image: ""
	});
	const [isUploading, setIsUploading] = useState(false);
	const handleFileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const formData = new FormData();
		formData.append("image", file);
		try {
			setIsUploading(true);
			const res = await api.post("/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
			setForm((prev) => ({
				...prev,
				image: res.data.url
			}));
		} catch (err) {
			alert("Erreur lors du téléchargement du fichier.");
		} finally {
			setIsUploading(false);
		}
	};
	useEffect(() => {
		if (certification) setForm({
			name: certification.name,
			issuer: certification.issuer,
			issue_date: certification.issue_date,
			expiration_date: certification.expiration_date || "",
			credential_id: certification.credential_id || "",
			credential_url: certification.credential_url || "",
			image: certification.image || ""
		});
	}, [certification]);
	const mutation = useMutation({
		mutationFn: () => {
			if (certification) return api.put(`/certifications/${certification.id}`, form);
			return api.post("/certifications", form);
		},
		onSuccess: onSaved,
		onError: () => alert("Erreur lors de l'enregistrement.")
	});
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm",
		children: /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			className: "island-shell w-full max-w-md rounded-2xl p-6 sm:p-8 relative",
			children: [
				/* @__PURE__ */ jsx("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-xl p-1.5 hover:bg-gray-100",
					children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-gray-500" })
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-bold text-[var(--sea-ink)] mb-6",
					children: certification ? "Modifier la certification" : "Nouvelle certification"
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => {
						e.preventDefault();
						mutation.mutate();
					},
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Nom du diplôme / certif"
							}), /* @__PURE__ */ jsx(Input, {
								required: true,
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								placeholder: "ex: AWS Solutions Architect"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Organisme émetteur"
							}), /* @__PURE__ */ jsx(Input, {
								required: true,
								value: form.issuer,
								onChange: (e) => setForm({
									...form,
									issuer: e.target.value
								}),
								placeholder: "ex: Amazon Web Services"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 grid-cols-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "Date d'obtention"
								}), /* @__PURE__ */ jsx(Input, {
									required: true,
									value: form.issue_date,
									onChange: (e) => setForm({
										...form,
										issue_date: e.target.value
									}),
									placeholder: "ex: Juin 2025"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "Date d'expiration"
								}), /* @__PURE__ */ jsx(Input, {
									value: form.expiration_date,
									onChange: (e) => setForm({
										...form,
										expiration_date: e.target.value
									}),
									placeholder: "ex: Juin 2028 ou Aucune"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Identifiant du justificatif"
							}), /* @__PURE__ */ jsx(Input, {
								value: form.credential_id,
								onChange: (e) => setForm({
									...form,
									credential_id: e.target.value
								}),
								placeholder: "ex: AWS-12345"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "URL de vérification"
							}), /* @__PURE__ */ jsx(Input, {
								value: form.credential_url,
								onChange: (e) => setForm({
									...form,
									credential_url: e.target.value
								}),
								placeholder: "https://..."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 grid-cols-2 items-end",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "Justificatif (Image/PDF)"
								}), /* @__PURE__ */ jsx(Input, {
									value: form.image,
									onChange: (e) => setForm({
										...form,
										image: e.target.value
									}),
									placeholder: "https://..."
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-col gap-1.5",
								children: /* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] py-2.5 px-4 text-sm font-semibold text-[var(--sea-ink)] cursor-pointer justify-center hover:bg-[var(--link-bg-hover)] transition",
									children: [
										/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
										isUploading ? "Téléchargement..." : "Téléverser justificatif",
										/* @__PURE__ */ jsx("input", {
											type: "file",
											accept: "image/*,application/pdf",
											onChange: handleFileUpload,
											className: "hidden"
										})
									]
								})
							})]
						}),
						form.image && /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] dark:bg-[var(--surface)] p-2.5 w-max",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-[var(--sea-ink-soft)] font-medium",
									children: "Justificatif :"
								}),
								form.image.toLowerCase().endsWith(".pdf") ? /* @__PURE__ */ jsx("span", {
									className: "text-xs font-mono font-bold text-blue-600",
									children: "Document PDF"
								}) : /* @__PURE__ */ jsx("img", {
									src: form.image,
									alt: "Diplôme",
									className: "h-7 w-7 object-contain"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setForm({
										...form,
										image: ""
									}),
									className: "bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 ml-2",
									children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-2 pt-4",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: onClose,
								className: "rounded-xl",
								children: "Annuler"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: mutation.isPending,
								className: "rounded-xl bg-[var(--sea-ink)] text-white",
								children: mutation.isPending ? "Enregistrement..." : "Enregistrer"
							})]
						})
					]
				})
			]
		})
	});
}
function SkillModal({ skill, categories, onClose, onSaved }) {
	const [form, setForm] = useState({
		name: "",
		category_id: "",
		proficiency: 80,
		icon: ""
	});
	useEffect(() => {
		if (skill) setForm({
			name: skill.name,
			category_id: String(skill.category?.id || ""),
			proficiency: skill.proficiency || 80,
			icon: skill.icon || ""
		});
		else if (categories.length > 0) setForm((f) => ({
			...f,
			category_id: String(categories[0].id)
		}));
	}, [skill, categories]);
	const mutation = useMutation({
		mutationFn: () => {
			if (skill) return api.put(`/skills/${skill.id}`, form);
			return api.post("/skills", form);
		},
		onSuccess: onSaved,
		onError: () => alert("Erreur.")
	});
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm",
		children: /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			className: "island-shell w-full max-w-sm rounded-2xl p-6 sm:p-8 relative",
			children: [
				/* @__PURE__ */ jsx("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-xl p-1.5 hover:bg-gray-100",
					children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-gray-500" })
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-bold text-[var(--sea-ink)] mb-6",
					children: skill ? "Modifier la compétence" : "Nouvelle compétence"
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => {
						e.preventDefault();
						mutation.mutate();
					},
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Nom de la compétence"
							}), /* @__PURE__ */ jsx(Input, {
								required: true,
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								placeholder: "ex: React.js, PHP"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-sm font-medium text-[var(--sea-ink)]",
								children: "Catégorie"
							}), /* @__PURE__ */ jsx("select", {
								value: form.category_id,
								onChange: (e) => setForm({
									...form,
									category_id: e.target.value
								}),
								className: "flex h-10 w-full rounded-xl border border-[rgba(23,58,64,0.12)] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(79,184,178,0.4)] text-[var(--sea-ink)]",
								children: categories.map((c) => /* @__PURE__ */ jsx("option", {
									value: c.id,
									className: "text-black",
									children: c.name
								}, c.id))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [
								/* @__PURE__ */ jsx("label", {
									className: "text-sm font-medium text-[var(--sea-ink)]",
									children: "URL de l'icône de la technologie"
								}),
								/* @__PURE__ */ jsx(Input, {
									value: form.icon,
									onChange: (e) => setForm({
										...form,
										icon: e.target.value
									}),
									placeholder: "ex: https://cdn.jsdelivr.net/... (SVG ou PNG)"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[10px] text-[var(--sea-ink-soft)] opacity-80",
									children: "Astuce : Utilisez un lien d'icône Devicon ou Simple Icons."
								})
							]
						}),
						form.icon && /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] dark:bg-[var(--surface)] p-2 w-max",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs text-[var(--sea-ink-soft)] font-medium",
								children: "Aperçu :"
							}), /* @__PURE__ */ jsx("img", {
								src: form.icon,
								alt: "Aperçu",
								className: "h-7 w-7 object-contain",
								onError: (e) => {
									e.currentTarget.style.display = "none";
								}
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between text-sm font-medium text-[var(--sea-ink)]",
								children: [/* @__PURE__ */ jsx("label", { children: "Niveau de maîtrise" }), /* @__PURE__ */ jsxs("span", { children: [form.proficiency, "%"] })]
							}), /* @__PURE__ */ jsx("input", {
								type: "range",
								min: "0",
								max: "100",
								value: form.proficiency,
								onChange: (e) => setForm({
									...form,
									proficiency: Number(e.target.value)
								}),
								className: "h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--lagoon-deep)]"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-2 pt-4",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: onClose,
								className: "rounded-xl",
								children: "Annuler"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: mutation.isPending,
								className: "rounded-xl bg-[var(--sea-ink)] text-white",
								children: mutation.isPending ? "Enregistrement..." : "Enregistrer"
							})]
						})
					]
				})
			]
		})
	});
}
function CategoryModal({ category, onClose, onSaved }) {
	const [name, setName] = useState("");
	useEffect(() => {
		if (category) setName(category.name);
	}, [category]);
	const mutation = useMutation({
		mutationFn: () => {
			if (category) return api.put(`/categories/${category.id}`, { name });
			return api.post("/categories", { name });
		},
		onSuccess: onSaved,
		onError: () => alert("Erreur.")
	});
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm",
		children: /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			className: "island-shell w-full max-w-sm rounded-2xl p-6 sm:p-8 relative",
			children: [
				/* @__PURE__ */ jsx("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-xl p-1.5 hover:bg-gray-100",
					children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-gray-500" })
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-bold text-[var(--sea-ink)] mb-6",
					children: category ? "Modifier la catégorie" : "Nouvelle catégorie"
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => {
						e.preventDefault();
						mutation.mutate();
					},
					className: "space-y-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm font-medium text-[var(--sea-ink)]",
							children: "Nom de la catégorie"
						}), /* @__PURE__ */ jsx(Input, {
							required: true,
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "ex: Frontend, Backend, Design"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-2 pt-4",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: onClose,
							className: "rounded-xl",
							children: "Annuler"
						}), /* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: mutation.isPending,
							className: "rounded-xl bg-[var(--sea-ink)] text-white",
							children: mutation.isPending ? "Enregistrement..." : "Enregistrer"
						})]
					})]
				})
			]
		})
	});
}
function ProfileForm({ initialProfile }) {
	const [form, setForm] = useState({
		id: "",
		title: "",
		bio: "",
		resume_url: "",
		github_url: "",
		linkedin_url: ""
	});
	const qc = useQueryClient();
	const [success, setSuccess] = useState(false);
	useEffect(() => {
		if (initialProfile) setForm({
			id: String(initialProfile.id || ""),
			title: initialProfile.title || "",
			bio: initialProfile.bio || "",
			resume_url: initialProfile.resume_url || "",
			github_url: initialProfile.github_url || "",
			linkedin_url: initialProfile.linkedin_url || ""
		});
	}, [initialProfile]);
	const mutation = useMutation({
		mutationFn: () => {
			if (form.id) return api.put(`/profile/${form.id}`, form);
			return api.post("/profile", form);
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-profile"] });
			setSuccess(true);
			setTimeout(() => setSuccess(false), 3e3);
		},
		onError: () => alert("Erreur lors de la mise à jour.")
	});
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: (e) => {
			e.preventDefault();
			mutation.mutate();
		},
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-lg font-bold text-[var(--sea-ink)] mb-4",
				children: "Informations Professionnelles"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ jsx("label", {
					className: "text-sm font-medium text-[var(--sea-ink)]",
					children: "Titre professionnel"
				}), /* @__PURE__ */ jsx(Input, {
					required: true,
					value: form.title,
					onChange: (e) => setForm({
						...form,
						title: e.target.value
					}),
					placeholder: "ex: Développeur Full-Stack"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ jsx("label", {
					className: "text-sm font-medium text-[var(--sea-ink)]",
					children: "Biographie (À propos)"
				}), /* @__PURE__ */ jsx(Textarea, {
					rows: 6,
					value: form.bio,
					onChange: (e) => setForm({
						...form,
						bio: e.target.value
					}),
					placeholder: "Racontez votre parcours, vos passions et vos points forts..."
				})]
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-lg font-bold text-[var(--sea-ink)] mt-6 mb-4",
				children: "Liens & Fichiers"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ jsx("label", {
					className: "text-sm font-medium text-[var(--sea-ink)]",
					children: "Lien du CV (ex: Google Drive, PDF)"
				}), /* @__PURE__ */ jsx(Input, {
					value: form.resume_url,
					onChange: (e) => setForm({
						...form,
						resume_url: e.target.value
					}),
					placeholder: "https://..."
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-sm font-medium text-[var(--sea-ink)]",
						children: "Profil GitHub"
					}), /* @__PURE__ */ jsx(Input, {
						value: form.github_url,
						onChange: (e) => setForm({
							...form,
							github_url: e.target.value
						}),
						placeholder: "https://github.com/mon-username"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-sm font-medium text-[var(--sea-ink)]",
						children: "Profil LinkedIn"
					}), /* @__PURE__ */ jsx(Input, {
						value: form.linkedin_url,
						onChange: (e) => setForm({
							...form,
							linkedin_url: e.target.value
						}),
						placeholder: "https://linkedin.com/in/mon-profil"
					})]
				})]
			}),
			success && /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 5
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "flex items-center gap-2 text-green-600 font-medium text-sm pt-2",
				children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }), " Profil enregistré avec succès !"]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pt-4 border-t border-[var(--line)] flex justify-end",
				children: /* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: mutation.isPending,
					className: "rounded-xl bg-[var(--sea-ink)] text-white font-semibold px-8",
					children: mutation.isPending ? "Enregistrement..." : "Enregistrer le profil"
				})
			})
		]
	});
}
function AdminPage() {
	const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
	const navigate = useNavigate();
	const qc = useQueryClient();
	const handleLogout = () => {
		api.post("/logout").catch(() => {});
		clearToken();
		setIsAuthenticated(false);
		qc.clear();
		navigate({ to: "/" });
	};
	if (!isAuthenticated) return /* @__PURE__ */ jsx(LoginForm, { onSuccess: () => setIsAuthenticated(true) });
	return /* @__PURE__ */ jsx(Dashboard, { onLogout: handleLogout });
}
//#endregion
export { AdminPage as component };
