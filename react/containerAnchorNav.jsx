import classNames from "classnames";
import React from "react";
import { useCssHandles } from "vtex.css-handles";
import "./styles/containerAnchorNav.css";

const CSS_HANDLES = ["containerAnchorNav"];

function containerAnchorNav({ children }) {
	const handles = useCssHandles(CSS_HANDLES);

	return <nav className={classNames(handles.containerAnchorNav)}>{children}</nav>;
}

export default containerAnchorNav;
