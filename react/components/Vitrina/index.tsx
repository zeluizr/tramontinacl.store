import classNames from "classnames";
import marked from "marked";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { baseRenderer } from "../../utils/_renderer";
import SCHEMA from "./_schema";

const CSS_HANDLES = ["vitrinaContainer"] as const;
function Vitrina({ title }: { title: string }) {
	const { handles } = useCssHandles(CSS_HANDLES);
	const renderer = useMemo(() => baseRenderer(), []);

	return (
		<section className={classNames(handles.vitrinaContainer)}>
			<div
				dangerouslySetInnerHTML={{
					__html: title && renderer ? marked.parse(title, { renderer }) : "",
				}}
			/>
		</section>
	);
}

Vitrina.schema = SCHEMA;

export default Vitrina;
