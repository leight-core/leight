import dayjs, {ConfigType} from "dayjs";

export const toLocalDate = (input?: ConfigType | null, fallback: string = "-"): string => {
	return input ? dayjs(input).format("L") : fallback;
};

export const toLocalDateTime = (input?: ConfigType | null, fallback: string = "-"): string => {
	return input ? dayjs(input).format("L LTS") : fallback;
};

export const asDayjs = (input?: ConfigType | null, fallback: ConfigType | null = null) => {
	return input ? dayjs(input) : (fallback ? (dayjs(fallback)) : null);
};
