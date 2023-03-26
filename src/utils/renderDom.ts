import Block from "@utils/Block";

export default function renderDom(query: string, block: Block) {
	const root = document.querySelector(query);

	if (!root) {
		return;
	}

	root.innerHTML = "";

	root.appendChild(block.getContent()!);

	block.dispatchComponentDidMount();
}
