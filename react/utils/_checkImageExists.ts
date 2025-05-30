import axios from "axios";

export const checkImageExists = async (baseName: string, extensions: string[]) => {
	for (const ext of extensions) {
		const url = `https://tramontinacl.vteximg.com.br/arquivos/${baseName}.${ext}`;

		try {
			const response = await axios.head(url);
			if (response.status === 200) return url;
		} catch (_) {
			continue;
		}
	}
	return null;
};
