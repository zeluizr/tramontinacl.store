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
		size: {
			title: "Tamaño",
			type: "string",
			enum: [45, 60, 75],
			enumNames: ["Pequeño", "Mediano", "Grande"],
			default: 45,
		},
	},
};
