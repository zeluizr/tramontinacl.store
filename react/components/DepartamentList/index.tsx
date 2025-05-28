import classNames from "classnames";
import marked, { Renderer } from "marked";
import { useEffect, useRef, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { ListContextProvider, useListContext } from "vtex.list-context";
import { SliderLayout } from "vtex.slider-layout";
import RENDERER from "../../utils/_renderer";
import SCHEMA from "./_schema";

const CSS_HANDLES = ["departamentListContainer", "departamentListTitle"] as const;

function DepartamentList({ title, department, slider }: DepartamentListProps) {
	const { handles } = useCssHandles(CSS_HANDLES);
	const { list } = useListContext() || [];
	const renderer = useRef<Renderer | null>(null);
	const [, setMounted] = useState(false);

	useEffect(() => {
		if (!renderer.current) renderer.current = RENDERER();
		setMounted(true);
	}, []);

	const _department = department?.map(({ title, imageUrl, link }, idx) => {
		return (
			<a key={idx} className={classNames("flex flex-column link black")} href={link?.href} target={link?.target}>
				<img src={imageUrl} alt={title} />
				<p className={classNames("t-small tc")}>{title}</p>
			</a>
		);
	});

	const departmentList = list.concat(_department);

	return (
		<div className={classNames(handles.departamentListContainer)}>
			<div
				className={classNames(handles.departamentListTitle, "flex justify-center items-center")}
				dangerouslySetInnerHTML={{
					__html: title ? marked.parse(title, { renderer: renderer.current! }) : "",
				}}
			/>
			<ListContextProvider list={departmentList}>
				<SliderLayout {...slider} />
			</ListContextProvider>
		</div>
	);
}

DepartamentList.schema = SCHEMA;

export default DepartamentList;
