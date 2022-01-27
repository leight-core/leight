import {DatePicker as CoolDatePicker, DatePickerProps} from "antd";
import {FC} from "react";

export type IDatePickerProps = {
	format?: string
}

export const DatePicker: FC<DatePickerProps & IDatePickerProps> = ({format = "LLL", ...props}) => {
	return <CoolDatePicker
		format={date => date.format("LLL")}
		size={"large"}
		style={{width: "100%"}}
		{...props}
	/>;
};
