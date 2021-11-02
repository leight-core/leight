import {DatePicker} from "@leight-core/leight";
import {PickerTimeProps} from "antd/es/date-picker/generatePicker";
import {Dayjs} from "dayjs";
import React, {forwardRef} from "react";

export interface ITimePickerProps extends Omit<PickerTimeProps<Dayjs>, "picker"> {
}

export const TimePicker = forwardRef<any, ITimePickerProps>((props, ref) => <DatePicker {...props} picker={"time"} mode={undefined} ref={ref}/>);

TimePicker.displayName = "TimePicker";
