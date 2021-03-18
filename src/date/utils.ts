import dayjs, {ConfigType} from "dayjs";

export const toLocalDate = (input?: ConfigType, fallback: string = "-"): string => {
	return input ? dayjs(input).format("L") : fallback;
};
