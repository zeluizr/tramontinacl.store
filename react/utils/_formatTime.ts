export const formatTime: FormatTime = (time) => {
	return time < 10 ? `0${time}` : time.toString();
};
