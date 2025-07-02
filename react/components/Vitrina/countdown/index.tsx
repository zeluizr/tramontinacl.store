import classNames from "classnames";
import { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { CountDownBox } from "../../../utils/_boxCountDown";
import { getTimeRemaining } from "../../../utils/_getTimeRemaining";
import "../styles.css";

const CSS_HANDLES = ["countDownContainer"];

const CountDown = ({ endDate, backgroundImage, children, subTitle, title, titleColor }: CountDownProps) => {
	if (!endDate || endDate === "") return null;

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

	if (!timeRemaining || hideCountdown) return null;

	return (
		<div
			style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
			className={classNames(handles.countDownContainer, "flex flex-column pa5 br3")}
		>
			<div className={classNames("flex justify-between items-center")}>
				<div>
					{title && (
						<h2 className="t-heading-2 c-on-base flex items-center mt0 mb0" style={{ color: titleColor || "#000" }}>
							{title}
						</h2>
					)}
					{subTitle && (
						<p className="t-body c-on-base flex items-center mt0 mb0" style={{ color: titleColor || "#000" }}>
							{subTitle}
						</p>
					)}
				</div>
				<section className={classNames("flex justify-center items-center mr3")} style={{ gap: "0.5rem" }}>
					{timeRemaining.days > 0 && (
						<CountDownBox timeRemaining={timeRemaining.days} stringText="Día" titleColor={titleColor} />
					)}
					<CountDownBox timeRemaining={timeRemaining.hours} stringText="Hora" titleColor={titleColor} />
					<CountDownBox timeRemaining={timeRemaining.minutes} stringText="Minuto" titleColor={titleColor} />
					<CountDownBox timeRemaining={timeRemaining.seconds} stringText="Segundo" titleColor={titleColor} />
				</section>
			</div>
			<>{children}</>
		</div>
	);
};

export default CountDown;
