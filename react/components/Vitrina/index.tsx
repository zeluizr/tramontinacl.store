import classNames from "classnames";
import marked from "marked";
import React, { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { renderer } from "../../utils/_renderer";
import SCHEMA from "./_schema";
import "./styles.css";

const CSS_HANDLES = ["vitrinaContainer", "vitrinaTitle", "vitrinaSubTitle"] as const;
function Vitrina({
	title,
	backgroundImage,
	subTitle,
	children,
}: {
	title: string;
	backgroundImage: string;
	subTitle: string;
	children: React.ReactNode;
}) {
	const { handles } = useCssHandles(CSS_HANDLES);
	const _renderer = useMemo(() => renderer({ isWhite: backgroundImage ? true : false }), []);

	return (
		<section
			className={classNames(handles.vitrinaContainer, backgroundImage ? "br3" : "br0")}
			style={{ backgroundImage: `url(${backgroundImage})` }}
		>
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
			<>{children}</>
		</section>
	);
}

Vitrina.schema = SCHEMA;

export default Vitrina;
