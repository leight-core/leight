import dayjs, {ConfigType} from "dayjs";

export const toLocalDate = (input?: ConfigType | null, fallback: string = "-"): string => {
	return input ? dayjs(input).format("L") : fallback;
};

export const toLocalDateTime = (input?: ConfigType | null, fallback: string = "-"): string => {
	return input ? dayjs(input).format("L LTS") : fallback;
};

export const toUtcDateTime = (input ?: ConfigType | null, fallback: string | null = null): string | null => {
	try {
		return input ? (dayjs(input) as any).utc().format() : fallback;
	} catch (e) {
		console.error("Dayjs does not have registered utc() plugin!", "https://day.js.org/docs/en/plugin/utc", e);
		return fallback;
	}
};

export const asDayjs = (input?: ConfigType | null, fallback: ConfigType | null = null) => {
	return input ? dayjs(input) : (fallback ? (dayjs(fallback)) : null);
};
