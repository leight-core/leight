import {Form, Input} from "antd";
import SubmitIcon from "../icon/SubmitIcon";
import SubmitButton from "./SubmitButton";

export default {
	title: "Leight/Form/Submit",
	component: SubmitButton,
	argTypes: {
		title: {control: {type: "text"}},
		form: {control: {disable: true}},
		icon: {control: {disable: true}},
	},
	args: {
		title: "Submit!",
		icon: <SubmitIcon/>,
	},
	decorators: [Story => {
		const [form] = Form.useForm();
		return (
			<Form form={form} layout="inline" onFinish={() => alert("boo!")}>
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
				<Story form={form} icon={<SubmitIcon/>}/>
			</Form>
		);
	}]
};

const Template = (args, {form, icon}) => <SubmitButton {...args} form={form} icon={icon}/>;

export const Submit = Template.bind({});
Submit.parameters = {
	docs: {
		source: {
			code: "<SubmitButton form={form} title={'title'}/>",
		}
	}
};
