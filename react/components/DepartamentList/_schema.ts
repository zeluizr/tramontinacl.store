export default {
	title: "Departamentos",
	description: "",
	type: "object",
	properties: {
		title: {
			title: "Title",
			type: "string",
		},
		department: {
			title: "Department",
			type: "array",
			items: {
				title: "Items",
				type: "object",
				properties: {
					__editorItemTitle: {
						title: "Title",
						description: "Ese titulo es para el backoffice",
						type: "string",
					},
					title: {
						title: "Texto",
						type: "string",
					},
					imageUrl: {
						title: "Imagen",
						type: "string",
						widget: { "ui:widget": "image-uploader" },
					},
					link: {
						title: "Link",
						type: "object",
						properties: {
							href: {
								title: "URL",
								type: "string",
							},
							target: {
								title: "Target",
								type: "string",
								enum: ["_blank", "_self"],
								enumNames: ["Blank", "Self"],
							},
						},
					},
				},
			},
		},
	},
};
