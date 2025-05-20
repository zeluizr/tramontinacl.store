import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import Icon from "./Icon";
import Schema from "./Schema";

const CSS_HANDLES = ["whatsAppLink"];

function WhatsApp({ phone, message, size, inverted }: WhatsAppProps) {
	const { handles } = useCssHandles(CSS_HANDLES);

	if (!phone) return null;
	if (!message) message = "Hola, tengo una consulta sobre un producto.";
	const URI = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

	return (
		<a href={URI} target="_blank" className={classNames(handles.whatsAppLink, "flex fixed bottom-1 right-1 z-0")}>
			<Icon inverted={inverted} size={size} />
		</a>
	);
}

WhatsApp.schema = Schema;

export default WhatsApp;
