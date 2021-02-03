import generatePicker from "antd/lib/date-picker/generatePicker";
import "antd/lib/date-picker/style/index";
import dayjs, {Dayjs} from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";

const DatePickerInternal = generatePicker<Dayjs>(dayjsGenerateConfig);

export const DatePicker = (props) => {
	return (
		<DatePickerInternal format={item => dayjs(item).format("L")} {...props}/>
	);
};
