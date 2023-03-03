import renderDOM, { ROUTES } from "@utils/renderDom";

/** Временное решение для реализации переключения страниц без роутера */
export default function getGoToPageFunction(page: keyof typeof ROUTES) {
	return (event: Event) => {
		event.preventDefault();
		renderDOM(page);
	};
}
