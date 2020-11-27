import {action} from "@storybook/addon-actions";
import {Button, Card, Divider, Form, Input} from "antd";
import {useEffect, useState} from "react";
import CreateItemIcon from "../icon/CreateItemIcon";
import DeleteItemIcon from "../icon/DeleteItemIcon";
import Spinner from "../icon/Spinner";
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
			<Form form={form} layout={"vertical"} onFinish={action("onFinish")}>
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
			<Form form={form} layout={"vertical"} onFinish={action("onFinish")}>
				<FormItem name={"some-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem required name={"required-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem name={"another-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem name={["foo", "bar"]}/>
				<Form.List name={["some", "internal", "dynamic", "form"]}>
					{(fields, {
						add,
						remove
					}) => (
						<Card>
							{fields.map(field => (
								<div key={field.key}>
									<FormItem key={field.key + ".type"} name={[field.fieldKey, "type"]} fieldKey={[field.fieldKey, "type"]}/>
									<FormItem required key={field.key + ".value"} name={[field.fieldKey, "value"]} fieldKey={[field.fieldKey, "value"]}/>
									<Button
										type="primary"
										ghost
										onClick={() => remove(field.name)}
										children={"remove"}
										icon={<DeleteItemIcon/>}
									/>
									<Divider type={"horizontal"}/>
								</div>
							))}
							<Button
								type="primary"
								ghost
								onClick={() => add()}
								children={"add"}
								icon={<CreateItemIcon/>}
							/>
						</Card>
					)}
				</Form.List>
				<SwitchFormItem name={"switch"}/>
				<Story form={form} icon={<SubmitIcon/>}/>
			</Form>
		</Centered>
	);
}];

export const SubmitWithPostInitials = Template.bind({});
SubmitWithPostInitials.decorators = [Story => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			form.setFieldsValue({
				"some-value": "the value",
				"required-value": "required",
			});
			setLoading(false);
		}, 1250);
	}, []);
	return (
		<Centered span={14}>
			<Form form={form} layout={"vertical"} onFinish={action("onFinish")}>
				<FormItem name={"some-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem required name={"required-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem name={"another-value"} children={label => <Input placeholder={label}/>}/>
				<Story form={form} icon={<Spinner done={!loading} children={<SubmitIcon/>}/>}/>
			</Form>
		</Centered>
	);
}];
