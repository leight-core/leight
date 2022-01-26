import {DatePicker} from "@leight-core/leight";
import {PickerTimeProps} from "antd/lib/date-picker/generatePicker";
import {Moment} from "moment";
import React, {forwardRef} from "react";

export const TimePicker = forwardRef<any, Omit<PickerTimeProps<Moment>, "picker">>((props, ref) => <DatePicker {...props} picker={"time"} mode={undefined} ref={ref}/>);

TimePicker.displayName = "TimePicker";
