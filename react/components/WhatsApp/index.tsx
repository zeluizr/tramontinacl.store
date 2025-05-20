import classNames from "classnames";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useDevice } from "vtex.device-detector";
import Icon from "./Icon";
import Schema from "./Schema";

const CSS_HANDLES = ["whatsAppLink"];

function WhatsApp({ phone, message, inverted, position }: WhatsAppProps) {
	if (!phone || !message) return null;

	const { handles } = useCssHandles(CSS_HANDLES);
	const { isMobile } = useDevice();
	const url = useMemo(() => {
		return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
	}, [phone, message]);

	return (
		<a
			className={classNames(
				handles.whatsAppLink,
				"flex fixed z-0 bottom-1",
				position === "left" ? "left-1" : "right-1"
			)}
			href={url}
			target="_blank"
		>
			<Icon inverted={inverted} size={isMobile ? 60 : 75} />
		</a>
	);
}

WhatsApp.schema = Schema;

export default WhatsApp;
