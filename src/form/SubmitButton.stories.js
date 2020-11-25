import {action} from "@storybook/addon-actions";
import {Form, Input} from "antd";
import SubmitIcon from "../icon/SubmitIcon";
import SubmitButton from "./SubmitButton";

export default {
	title: "Leight/Form/Submit",
	component: SubmitButton,
	argTypes: {
		title: {
			control: {type: "string"},
		},
		form: {
			control: {disable: true},
		}
	},
	args: {
		title: "Submit!",
	},
};

const Template = args => {
	const [form] = Form.useForm();
	return (
		<Form form={form} layout="inline" onFinish={action("Done!")}>
			<Form.Item
				name={"username"}
				rules={[
					{
						required: true,
						message: "Please input your username!"
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
						message: "Please input your password!"
					}
				]}
			>
				<Input
					type={"password"}
					placeholder={"Password"}
				/>
			</Form.Item>
			<SubmitButton {...args} form={form} icon={<SubmitIcon/>}/>
		</Form>
	);
};

export const Submit = Template.bind({});

Submit.parameters = {
	docs: {
		source: {
			code: "<SubmitButton title={'Submit!'} form={form}/>",
		}
	}
};
