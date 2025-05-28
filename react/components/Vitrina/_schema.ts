export default {
	title: "Configuración de Componente",
	description: "Configuración de Componente",
	type: "object",
	properties: {
		title: {
			title: "Titulo",
			type: "string",
			default: "Vitrina",
		},
		subTitle: {
			title: "Subtitulo",
			type: "string",
			default: "Bienvenido a nuestra tienda",
		},
		backgroundImage: {
			title: "Imagen de Fondo",
			type: "string",
			default: "",
			widget: { "ui:widget": "image-uploader" },
		},
	},
};
