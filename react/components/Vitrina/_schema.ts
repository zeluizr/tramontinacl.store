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
	},
};
