export const formatWeight = (value: any) => {
	if (value >= 1000) {
		return value > 0 ? `${Math.round(value / 1000)} kg` : "N/A";
	}

	return value > 0 ? `${Math.round(value)} g` : "N/A";
};
