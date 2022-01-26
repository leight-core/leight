import {Calendar as CoolCalendar, CalendarProps as CoolCalendarProps} from "antd";
import {Moment} from "moment";
import {FC} from "react";

export const Calendar: FC<CoolCalendarProps<Moment>> = props => {
	return <CoolCalendar
		{...props}
	/>;
};
