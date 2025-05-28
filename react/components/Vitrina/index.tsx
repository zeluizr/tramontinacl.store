import classNames from "classnames";
import marked from "marked";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { renderer } from "../../utils/_renderer";
import SCHEMA from "./_schema";
import "./styles.css";

const CSS_HANDLES = ["vitrinaContainer", "vitrinaTitle", "vitrinaSubTitle"] as const;
function Vitrina({ title, backgroundImage, subTitle }: { title: string; backgroundImage: string; subTitle: string }) {
	const { handles } = useCssHandles(CSS_HANDLES);
	const _renderer = useMemo(() => renderer({ isWhite: backgroundImage ? true : false }), []);

	return (
		<section className={classNames(handles.vitrinaContainer)} style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div
				className={classNames(handles.vitrinaTitle, "flex justify-center items-center")}
				dangerouslySetInnerHTML={{
					__html: title && _renderer ? marked.parse(title, { renderer: _renderer }) : "",
				}}
			/>
			<div
				className={classNames(handles.vitrinaSubTitle, "flex justify-center items-center")}
				dangerouslySetInnerHTML={{
					__html: subTitle && _renderer ? marked.parse(subTitle, { renderer: _renderer }) : "",
				}}
			/>
		</section>
	);
}

Vitrina.schema = SCHEMA;

export default Vitrina;
