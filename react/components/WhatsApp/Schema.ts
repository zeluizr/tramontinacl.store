export default {
	title: "WhatsApp",
	description: "WhatsApp",
	type: "object",
	properties: {
		inverted: {
			title: "Invertir?",
			type: "boolean",
			default: false,
		},
		phone: {
			title: "Telefono",
			type: "number",
			default: 0,
		},
		message: {
			title: "Mensaje",
			type: "string",
			default: "",
		},
		position: {
			title: "Posicion",
			type: "string",
			enum: ["left", "right"],
			enumNames: ["Izquierda", "Derecha"],
			default: "right",
		},
	},
};
