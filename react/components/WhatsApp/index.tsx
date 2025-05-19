import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";
import { Icon } from "vtex.store-icons";
import Schema from "./Schema";

const CSS_HANDLES = ["container"];

function WhatsApp({ phone, message, size, inverted }: WhatsAppProps) {
	const { handles } = useCssHandles(CSS_HANDLES);

	console.log("handles", handles.container);

	if (!phone) return null;
	if (!message) message = "Hola, tengo una consulta sobre un producto.";

	return (
		<div className={classNames(handles.container, "fixed bottom-1 right-1")}>
			<a href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`} target="_blank" className="flex">
				{inverted ? (
					<Icon id="icon-atendimento-online" size={size || 25} />
				) : (
					<Icon id="icon-atendimento-online-narrow" size={size || 25} />
				)}
			</a>
		</div>
	);
}

WhatsApp.schema = Schema;

export default WhatsApp;
