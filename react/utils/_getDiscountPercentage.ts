export const getDiscountPercentage = (list: number, current: number): string | null => {
	if (!list || !current || list <= current) return null;
	const discount = Math.round(((list - current) / list) * 100);
	return `${discount}%`;
};
