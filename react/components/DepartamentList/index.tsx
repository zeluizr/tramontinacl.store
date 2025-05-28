import classNames from "classnames";
import marked from "marked";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { ListContextProvider, useListContext } from "vtex.list-context";
import { SliderLayout } from "vtex.slider-layout";
import { renderer } from "../../utils/_renderer";
import SCHEMA from "./_schema";
import "./styles.css";

const CSS_HANDLES = ["departamentListContainer", "departamentListTitle"] as const;

function DepartamentList({ title, department, slider }: DepartamentListProps) {
	const { handles } = useCssHandles(CSS_HANDLES);
	const { list } = useListContext() || [];
	const _renderer = useMemo(() => renderer({ isWhite: false }), []);

	const departmentList = [
		...list,
		...(department?.map(({ title, imageUrl, link }, idx) => (
			<a key={idx} className="flex flex-column link black" href={link?.href} target={link?.target}>
				<img src={imageUrl} alt={title} />
				<p className="t-small tc mt5 mb0">{title}</p>
			</a>
		)) || []),
	];

	return (
		<section className={classNames(handles.departamentListContainer)}>
			<div
				className={classNames(handles.departamentListTitle, "flex justify-center items-center mb9")}
				dangerouslySetInnerHTML={{
					__html: title && _renderer ? marked.parse(title, { renderer: _renderer }) : "",
				}}
			/>
			<ListContextProvider list={departmentList}>
				<SliderLayout {...slider} />
			</ListContextProvider>
		</section>
	);
}

DepartamentList.schema = SCHEMA;

export default DepartamentList;
