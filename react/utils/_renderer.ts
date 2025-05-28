import classNames from "classnames";
import { Renderer } from "marked";

export function renderer({ isWhite }: { isWhite?: boolean }) {
	const r = new Renderer();

	const colorClass = isWhite ? "white" : "black";
	const strongClass = isWhite ? "white" : "c-action-primary";

	r.paragraph = (content: string) => `<p class="${classNames(colorClass, "mt0 mb0")}">${content}</p>`;
	r.em = (content: string) => `<em class="${classNames(colorClass)}">${content}</em>`;
	r.strong = (content: string) => `<strong class="${classNames(strongClass)}">${content}</strong>`;
	r.heading = (text: string, level: number) => {
		const headingClassMap: Record<number, string> = {
			1: "t-heading-2",
			2: "t-heading-2",
			3: "t-heading-3",
			4: "t-heading-4",
			5: "t-heading-5",
			6: "t-heading-6",
		};

		const headingClass = headingClassMap[level] || "t-heading-2";
		return `<h${level} class="${classNames(colorClass, headingClass, "mt0 mb0")}">${text}</h${level}>`;
	};

	return r;
}
