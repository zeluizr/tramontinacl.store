import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { useDevice } from "vtex.device-detector";
import Icon from "./Icon";
import Schema from "./Schema";

const CSS_HANDLES = ["whatsAppLink"];

function WhatsApp({ phone, message, inverted }: WhatsAppProps) {
	const { handles } = useCssHandles(CSS_HANDLES);
	const { isMobile } = useDevice();

	return (
		<a
			className={classNames(handles.whatsAppLink, "flex fixed bottom-1 right-1 z-0")}
			href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
			target="_blank"
		>
			<Icon inverted={inverted} size={isMobile ? 45 : 60} />
		</a>
	);
}

WhatsApp.schema = Schema;

export default WhatsApp;
