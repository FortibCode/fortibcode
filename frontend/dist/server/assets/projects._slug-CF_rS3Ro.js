import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/projects.$slug.tsx
var $$splitComponentImporter = () => import("./projects._slug-BRfENDlJ.js");
var Route = createFileRoute("/projects/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Détails du Projet | Mon Portfolio" }, {
		name: "description",
		content: "Découvrez la description détaillée, la technologie utilisée et les liens de démonstration de ce projet."
	}] })
});
//#endregion
export { Route as t };
