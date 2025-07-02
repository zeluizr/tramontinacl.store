import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { formatTime } from "../_formatTime";
import "./styles.css";

const CSS_HANDLES = ["countDownBox", "countDownTimer", "countDownText"];

export const CountDownBox = ({ timeRemaining, stringText, titleColor }: CountDownBoxProps) => {
	const { handles } = useCssHandles(CSS_HANDLES);

	return (
		<div className={classNames(handles.countDownBox, "flex flex-column justify-center items-center")}>
			<span className={classNames(handles.countDownTimer, "bg-white b pa4 br2 t-heading-4")}>{`${formatTime(
				timeRemaining
			)}`}</span>
			{stringText && (
				<span className={classNames(handles.countDownText, "t-mini mt3 b")} style={{ color: titleColor || "#000" }}>
					{stringText}
				</span>
			)}
		</div>
	);
};
