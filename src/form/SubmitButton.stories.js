import {Form, Input} from "antd";
import SubmitIcon from "../icon/SubmitIcon";
import FormItem from "./FormItem";
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
			<Form form={form} layout="inline">
				<FormItem name={"login"} children={label => <Input placeholder={label}/>}/>
				<FormItem name={"password"} children={label => <Input type={"password"} placeholder={label}/>}/>
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
