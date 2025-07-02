import classNames from "classnames";
import { useEffect, useState } from "react";
import { defineMessages } from "react-intl";
import { useCssHandles } from "vtex.css-handles";
import { getTimeRemaining } from "../../utils/getTimeRemaining";
import { CountDownBox } from "./_box";

const CountDown = ({ endDate, isActive, title, subtitle, children }: CountDownProps) => {
	const CSS_HANDLES = ["containerCountDown", "picture", "countdown", "boxcountdown", "imageTitleContDown"];
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
		<div className={classNames(handles.containerCountDown, "flex")}>
			<div>
				<div className={classNames(handles.imageTitleContDown)}>
					{title && <h2>{title}</h2>}
					{subtitle && <h3>{subtitle}</h3>}
				</div>
				<div className={classNames(handles.boxcountdown, "flex")}>
					<section className={classNames(handles.countdown)}>
						<div className="">
							<span>Termina en </span>
							<div className="">
								{timeRemaining.days > 0 && <CountDownBox timeRemaining={timeRemaining.days} />}
								<CountDownBox timeRemaining={timeRemaining.hours} />
								<CountDownBox timeRemaining={timeRemaining.minutes} />
								<CountDownBox timeRemaining={timeRemaining.seconds} />
							</div>
						</div>
					</section>
				</div>
			</div>
			<section style={{ width: 500 }}>{children}</section>
		</div>
	);
};

const messages = defineMessages({
	title: {
		defaultMessage: "Countdown",
	},
	description: {
		defaultMessage: "Countdown to a specific date",
	},
});

CountDown.schema = {
	title: messages.title.defaultMessage,
	description: messages.description.defaultMessage,
	type: "object",
	properties: {
		isActive: { title: "Activar", type: "boolean", default: true },
		title: {
			title: "Titulo",
			type: "string",
			default: "",
		},
		subtitle: {
			title: "Subtitulo",
			type: "string",
			default: "",
		},
		endDate: {
			title: "Elegir fecha de finalización",
			type: "string",
			format: "date-time",
			widget: { "ui:widget": "datetime" },
			default: "2023-02-23 17:29:59",
		},
	},
};

export default CountDown;
