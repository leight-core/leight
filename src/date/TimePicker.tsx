import {DatePicker} from "@leight-core/leight";
import {TimePickerProps} from "antd";
import React, {forwardRef} from "react";

export const TimePicker = forwardRef<any, Omit<TimePickerProps, "format">>((props, ref) => <DatePicker {...props} picker={"time"} mode={undefined} ref={ref}/>);

TimePicker.displayName = "TimePicker";
