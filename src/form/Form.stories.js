import { action } from "@storybook/addon-actions";
import {
	Form,
	Input
} from "antd";
import {
	Component,
	useEffect,
	useState
} from "react";
import SubmitButton from "./SubmitButton";

export default {
	title: "Leight/Form/Utils"
};

class LockOutlined extends Component<{ className: string }> {
	render() {
		return null;
	}
}

export const IsButtonEnabled = () => {
	const [form]          = Form.useForm();
	const [, forceUpdate] = useState();
	// To disable submit button at the beginning.
	useEffect(() => {
		forceUpdate({});
	}, []);
	return (
		<Form form={form} layout="inline" onFinish={action("Done!")}>
			<Form.Item
				name={"username"}
				rules={[
					{
						required: true,
						message:  "Please input your username!"
					}
				]}
			>
				<Input placeholder={"Username"}/>
			</Form.Item>
			<Form.Item
				name={"password"}
				rules={[
					{
						required: true,
						message:  "Please input your password!"
					}
				]}
			>
				<Input
					type={"password"}
					placeholder={"Password"}
				/>
			</Form.Item>
			<SubmitButton form={form}/>
		</Form>
	);
};

IsButtonEnabled.parameters = {
	controls: {hideNoControlsWarning: true},
};
