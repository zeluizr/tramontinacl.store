import classNames from "classnames";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["containerWhatsApp"];

function WhatsApp({ phone, message, image, size }: any) {
	const { handles } = useCssHandles(CSS_HANDLES);

	console.log("WhatsApp", phone, message, image, size);

	return (
		<a
			href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
			target="_blank"
			className={(classNames(handles.containerWhatsApp), "fixed bottom-1 right-1")}
		>
			<img src={image} alt="WhatsApp" width={size} />
		</a>
	);
}

WhatsApp.schema = {
	title: "WhatsApp",
	description: "WhatsApp",
	type: "object",
	properties: {
		phone: {
			title: "Phone",
			type: "string",
			default: "",
		},
		message: {
			title: "Message",
			type: "string",
			default: "",
		},
		image: {
			title: "Image",
			type: "string",
			default: "",
			widget: { "ui:widget": "image-uploader" },
		},
		size: {
			title: "Size",
			type: "string",
			enum: [45, 60, 75],
			enumNames: ["Pequeño", "Mediano", "Grande"],
			default: 45,
		},
	},
};

export default WhatsApp;
