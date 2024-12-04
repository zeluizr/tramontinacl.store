import { messages } from "./message";

export default {
	title: messages.title.id,
	description: "messages.description.id",
	type: "object",
	properties: {
		anchors: {
			title: "messages.anchors.id",
			type: "array",
			items: {
				title: "messages.anchor.id",
				type: "object",
				properties: {
					__editorItemTitle: {
						title: "admin/editor.list-anchor.editorItemTitle.title",
						description: "admin/editor.list-anchor.editorItemTitle.description",
						type: "string",
					},
					title: {
						title: "admin/editor.list-anchor.title.title",
						description: "admin/editor.list-anchor.title.description",
						type: "string",
					},
					attributeTitle: {
						title: "admin/editor.list-anchor.title.title",
						description: "admin/editor.list-anchor.title.description",
						type: "string",
					},
					url: {
						title: "admin/editor.list-anchor.anchor.title",
						description: "admin/editor.list-anchor.anchor.description",
						type: "string",
					},
				},
			},
		},
	},
};
