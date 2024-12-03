import classNames from "classnames";
import React from "react";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["container", "sellingPrice", "listPrice", "flag"];

export default function PrecioM2() {
	const handles = useCssHandles(CSS_HANDLES);

	return (
		<div className={classNames(handles.container)}>
			<h1>{`Precio por metro cuadrado`}</h1>
		</div>
	);
}
