import { useCssHandles } from "vtex.css-handles";
import { formatTime } from "../../../utils/_formatTime";

const CSS_HANDLES = ["countDownBox", "countDownTimer", "countDownText"];

export const CountDownBox = ({ timeRemaining, stringText }: CountDownBoxProps) => {
	const { handles } = useCssHandles(CSS_HANDLES);

	return (
		<div className={`${handles.countDownBox}`}>
			<span className={`${handles.countDownTimer}`}>{`${formatTime(timeRemaining)}`}</span>
			{stringText && <span className={`${handles.countDownText}`}>{stringText}</span>}
		</div>
	);
};
