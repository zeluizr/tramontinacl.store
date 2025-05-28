import { Renderer } from "marked";

export default function renderer() {
	const r = new Renderer();
	r.strong = (content: string) => `<span class="">${content}</span>`;
	r.paragraph = (content: string) => `<p class="">${content}</p>`;
	r.em = (content: string) => `<em class="">${content}</em>`;
	r.strong = (content: string) => `<strong class="c-action-primary">${content}</strong>`;
	r.heading = (text: string, level: number) => `<h${level} class="t-heading-2 mt0 mb0">${text}</h${level}>`;

	return r;
}
