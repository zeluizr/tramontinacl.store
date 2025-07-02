import classNames from "classnames";
import { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { getTimeRemaining } from "../../../utils/_getTimeRemaining";
import "../styles.css";
import { CountDownBox } from "./_box";

const CSS_HANDLES = ["countDownContainer"];

const CountDown = ({ endDate, isActive }: CountDownProps) => {
	const { handles } = useCssHandles(CSS_HANDLES);

	const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
	const [hideCountdown, setHideCountdown] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const remaining = getTimeRemaining(endDate);
			setTimeRemaining(remaining);
			if (remaining.total < 0) {
				clearInterval(interval);
				setHideCountdown(true);
			} else {
				setHideCountdown(false);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [endDate]);

	if (!timeRemaining || !isActive || hideCountdown) return null;

	return (
		<section className={classNames(handles.countDownContainer)}>
			{timeRemaining.days > 0 && <CountDownBox timeRemaining={timeRemaining.days} />}
			<CountDownBox timeRemaining={timeRemaining.hours} />
			<CountDownBox timeRemaining={timeRemaining.minutes} />
			<CountDownBox timeRemaining={timeRemaining.seconds} />
		</section>
	);
};

export default CountDown;
