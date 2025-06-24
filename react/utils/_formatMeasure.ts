export const formatMeasure = (value: any) => {
	return value > 0 ? `${Math.round(value)} cm` : "N/A";
};
