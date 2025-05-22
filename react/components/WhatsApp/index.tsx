import classNames from "classnames";
import { useMemo } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useDevice } from "vtex.device-detector";
import Icon from "./Icon";
import Schema from "./Schema";

const CSS_HANDLES = ["whatsAppLink"];

function WhatsApp({ phone, message, inverted, position }: WhatsAppProps) {
	if (!phone || !message) {
		console.warn("WhatsApp: phone and message are required props. Please check the configuration.");
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
				"flex fixed z-0 bottom-5",
				position === "left" ? "left-5" : "right-5"
			)}
			href={url}
			target="_blank"
		>
			<Icon inverted={inverted} size={isMobile ? 60 : 65} />
		</a>
	);
}

WhatsApp.schema = Schema;

export default WhatsApp;
