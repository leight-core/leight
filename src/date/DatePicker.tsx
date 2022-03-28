import {useOptionalFormItemContext} from "@leight-core/leight";
import {DatePicker as CoolDatePicker, DatePickerProps} from "antd";
import {FC, forwardRef} from "react";

export type IDatePickerProps = {
	format?: string
	usePlaceholder?: boolean
}

export const DatePicker: FC<DatePickerProps & IDatePickerProps> = forwardRef(({format = "L", usePlaceholder = false, ...props}, ref) => {
	const formItemContext = useOptionalFormItemContext();
	return <CoolDatePicker
		format={date => date.format(format)}
		size={"large"}
		style={{width: "100%"}}
		placeholder={formItemContext && usePlaceholder ? formItemContext.label : undefined}
		ref={ref as any}
		{...props}
	/>;
});
