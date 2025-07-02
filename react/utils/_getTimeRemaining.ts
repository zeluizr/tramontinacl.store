export const getTimeRemaining = (endDate: string | number | Date): TimeRemaining => {
	if (!endDate || endDate === "") {
		return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
	}

	const total = Date.parse(endDate as string) - Date.parse(new Date().toString());

	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const days = Math.floor(total / (1000 * 60 * 60 * 24));

	return { total, days, hours, minutes, seconds };
};
