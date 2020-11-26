import {action} from "@storybook/addon-actions";
import {Form, Input} from "antd";
import SubmitIcon from "../icon/SubmitIcon";
import Centered from "../layout/Centered";
import FormItem from "./FormItem";
import SubmitButton from "./SubmitButton";
import SwitchFormItem from "./SwitchFormItem";

export default {
	title: "Leight/Form/Submit",
	component: SubmitButton,
	argTypes: {
		title: {control: {type: "text"}},
		form: {control: {disable: true}},
		fields: {control: {disable: true}},
		icon: {control: {disable: true}},
	},
	args: {
		title: "Submit!",
		icon: <SubmitIcon/>,
	},
};

const Template = (args, {form, icon}) => <SubmitButton {...args} form={form} icon={icon}/>;

export const SubmitWithRequired = Template.bind({});
SubmitWithRequired.decorators = [Story => {
	const [form] = Form.useForm();
	return (
		<Centered span={14}>
			<Form form={form} layout={"vertical"}>
				<FormItem required name={"login"} children={label => <Input placeholder={label}/>}/>
				<FormItem required name={"password"} children={label => <Input type={"password"} placeholder={label}/>}/>
				<Story form={form} icon={<SubmitIcon/>}/>
			</Form>
		</Centered>
	);
}];
SubmitWithRequired.parameters = {
	docs: {
		source: {
			code: "<SubmitButton form={form} title={'title'}/>",
		}
	}
};

export const SubmitWithOptional = Template.bind({});
SubmitWithOptional.decorators = [Story => {
	const [form] = Form.useForm();
	return (
		<Centered span={14}>
			<Form form={form} layout={"vertical"} onFinish={action("boo")}>
				<FormItem name={"some-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem required name={"required-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem name={"another-value"} children={label => <Input placeholder={label}/>}/>
				<SwitchFormItem name={"switch"}/>
				<Story form={form} icon={<SubmitIcon/>}/>
			</Form>
		</Centered>
	);
}];
SubmitWithOptional.args = {
	fields: ["required-value"],
};
