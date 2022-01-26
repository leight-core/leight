import {useOptionalFormItemContext} from "@leight-core/leight";
import {DatePicker as CoolDatePicker, DatePickerProps as CoolDatePickerProps} from "antd";
import {forwardRef} from "react";

export const DatePicker = forwardRef<any, CoolDatePickerProps & { format?: string }>(({format = "LLL", ...props}, ref) => {
	const formItemContext = useOptionalFormItemContext();
	return <CoolDatePicker
		ref={ref}
		format={date => date.format(format || "LLL")}
		{...props}
		placeholder={formItemContext && (props as any).usePlaceholder ? formItemContext.label : undefined}
	/>;
});
