import classNames from "classnames";
import marked from "marked";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { renderer } from "../../utils/_renderer";
import SCHEMA from "./_schema";
import CountDown from "./countdown";
import "./styles.css";

const CSS_HANDLES = [
	"vitrinaContainer",
	"vitrinaTitle",
	"vitrinaWhiteTitle",
	"vitrinaSubTitle",
	"vitrinaShelfContainer",
] as const;
function Vitrina({ title, backgroundImage, subTitle, children, isCountDownActive, endDate, titleColor }: VitrinaProps) {
	const { handles } = useCssHandles(CSS_HANDLES);
	const isWhite = !!backgroundImage || (!!title && !!subTitle);

	const _renderer = useMemo(() => {
		return renderer({ isWhite });
	}, [backgroundImage, title, subTitle]);

	if (isCountDownActive && endDate && endDate !== "" && title && subTitle && children && backgroundImage) {
		return (
			<CountDown
				endDate={endDate}
				children={children}
				title={title}
				subTitle={subTitle}
				backgroundImage={backgroundImage}
				titleColor={titleColor}
			/>
		);
	}

	return (
		<section
			className={classNames(handles.vitrinaContainer, backgroundImage ? "br3 pa5" : "br0 pa0")}
			style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
		>
			<div className={classNames({ "bg-action-primary br3 pa5": !backgroundImage && !!title && !!subTitle })}>
				{title && (
					<div
						className={classNames(
							isWhite ? handles.vitrinaWhiteTitle : handles.vitrinaTitle,
							"flex justify-center items-center"
						)}
						dangerouslySetInnerHTML={{
							__html: title && _renderer ? marked.parse(title, { renderer: _renderer }) : "",
						}}
					/>
				)}
				{subTitle && (
					<div
						className={classNames(handles.vitrinaSubTitle, "flex justify-center items-center")}
						dangerouslySetInnerHTML={{
							__html: subTitle && _renderer ? marked.parse(subTitle, { renderer: _renderer }) : "",
						}}
					/>
				)}
			</div>
			<div className={classNames(handles.vitrinaShelfContainer, "mt5")}>{children}</div>
		</section>
	);
}

Vitrina.schema = SCHEMA;

export default Vitrina;
