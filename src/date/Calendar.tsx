import generateCalendar from "antd/lib/calendar/generateCalendar";
import {Dayjs} from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";

export const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);
