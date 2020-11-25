import {action} from "@storybook/addon-actions";
import {Form, Input} from "antd";
import {useEffect, useState} from "react";
import SubmitButton from "./SubmitButton";

export default {
	title: "Leight/Form/Submit",
	component: SubmitButton,
	argTypes: {
		title: {
			control: {type: "string"},
			description: "Title on the button; goes through react-i18next.",
		},
		form: {
			control: {disable: true},
			table: {disable: true},
		}
	},
	args: {
		title: "Submit!",
	}
};

const Template = args => {
	const [form] = Form.useForm();
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
			<SubmitButton {...args} form={form}/>
		</Form>
	);
};

export const Submit = Template.bind({});
