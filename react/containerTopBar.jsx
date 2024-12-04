import classNames from "classnames";
import React from "react";
import { useCssHandles } from "vtex.css-handles";
import "./styles/containerTopBar.css";

const CSS_HANDLES = ["containerTopBar"];

function containerTopBar({ children }) {
	const handles = useCssHandles(CSS_HANDLES);

	return (
		<section className={classNames(handles.containerTopBar, "w-100")}>
			<div
				className={classNames(
					"w-100 mw9 pv5 ph5 center flex justify-center justify-between-l items-center"
				)}
			>
				{children}
			</div>
		</section>
	);
}

export default containerTopBar;
