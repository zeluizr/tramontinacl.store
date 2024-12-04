import classNames from "classnames";
import React, { Fragment } from "react";
import { useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";
import { TypographyMap } from "./helpers/TypographyMap";
import "./styles/ListAnchor.css";
import ListAnchorSchema from "./utils/schema";

const CSS_HANDLES = ["linkListAnchor"];

function ListAnchor({ typography, color, anchors }) {
	const handles = useCssHandles(CSS_HANDLES);

	return (
		<Fragment>
			{anchors?.map(({ url, title, attributeTitle }, idx) => {
				return (
					<Link
						key={idx}
						to={url}
						title={attributeTitle}
						className={classNames(
							handles.linkListAnchor,
							TypographyMap[typography],
							"link",
							color
						)}
					>
						{title}
					</Link>
				);
			})}
		</Fragment>
	);
}

ListAnchor.schema = ListAnchorSchema;

export default ListAnchor;
