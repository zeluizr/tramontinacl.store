export default {
	title: "Vitrina",
	description: "Vitrina",
	type: "object",
	properties: {
		title: {
			title: "Titulo",
			type: "string",
			default: "",
		},
		subTitle: {
			title: "Subtitulo",
			type: "string",
			default: "",
		},
		backgroundImage: {
			title: "Imagen de Fondo",
			type: "string",
			default: "",
			widget: { "ui:widget": "image-uploader" },
		},
		isCountDownActive: {
			title: "¿Activar contador regresivo?",
			type: "boolean",
			default: false,
		},
	},
	dependencies: {
		isCountDownActive: {
			oneOf: [
				{
					properties: {
						isCountDownActive: {
							const: true,
						},
						titleColor: {
							title: "Color del Título",
							type: "string",
							default: "",
							widget: { "ui:widget": "color" },
						},
						endDate: {
							title: "Fecha de finalización",
							type: "string",
							default: "",
							widget: { "ui:widget": "date-time" },
						},
					},
				},
				{
					properties: {
						isCountDownActive: {
							const: false,
						},
					},
				},
			],
		},
	},
};
