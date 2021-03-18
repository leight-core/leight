import dayjs, {ConfigType} from "dayjs";

export const toLocalDate = (input?: ConfigType, fallback: string = "-"): string => {
	return input ? dayjs(input).format("L") : fallback;
};

export const asDayjs = (input?: ConfigType, fallback: ConfigType | null = null) => {
	return input ? dayjs(input) : (fallback ? (dayjs(fallback)) : null);
};
