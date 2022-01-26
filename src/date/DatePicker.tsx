import {useDayjsContext, useOptionalFormItemContext} from "@leight-core/leight";
import generatePicker, {PickerProps} from "antd/es/date-picker/generatePicker";
import {Dayjs} from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import React, {forwardRef} from "react";

const DatePickerInternal = generatePicker<Dayjs>(dayjsGenerateConfig);

export const DatePicker = forwardRef<any, { usePlaceholder?: boolean } & Partial<PickerProps<Dayjs>>>((props, ref) => {
	const formItemContext = useOptionalFormItemContext();
	const dayJsContext = useDayjsContext();
	return <DatePickerInternal
		format={dayJsContext.dayjs.localeData().longDateFormat("L")}
		ref={ref}
		{...props}
		placeholder={formItemContext && (props as any).usePlaceholder ? formItemContext.label : undefined}
	/>;
});
