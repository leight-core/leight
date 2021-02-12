import generatePicker, {PickerProps} from "antd/lib/date-picker/generatePicker";
import "antd/lib/date-picker/style/index";
import dayjs, {Dayjs} from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import React from "react";

const DatePickerInternal = generatePicker<Dayjs>(dayjsGenerateConfig);

export const DatePicker = React.forwardRef<any, Partial<PickerProps<Dayjs>>>((props, ref) => <DatePickerInternal format={(dayjs as any).localeData().longDateFormat("L")} ref={ref} {...props}/>);
