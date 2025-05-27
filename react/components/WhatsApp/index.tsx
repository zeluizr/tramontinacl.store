import classNames from "classnames";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useDevice } from "vtex.device-detector";
import Icon from "./_icon";
import SCHEMA from "./_schema";

const CSS_HANDLES = ["whatsAppLink"];

function WhatsApp({ phone, message, inverted, position, isActive }: WhatsAppProps) {
	if (!isActive || !phone || !message) {
		if (!phone || !message) {
			console.warn("WhatsApp: phone and message are required props. Please check the configuration.");
		}
		return null;
	}

	const { handles } = useCssHandles(CSS_HANDLES);
	const { isMobile } = useDevice();
	const url = useMemo(() => {
		return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
	}, [phone, message]);

	return (
		<a
			className={classNames(
				handles.whatsAppLink,
				"flex fixed z-1 bottom-1",
				position === "left" ? "left-1" : "right-1"
			)}
			href={url}
			target="_blank"
			rel="noopener noreferrer"
		>
			<Icon inverted={inverted} size={isMobile ? 60 : 65} />
		</a>
	);
}

WhatsApp.schema = SCHEMA;

export default WhatsApp;
