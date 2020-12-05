import {action} from "@storybook/addon-actions";
import {Button, Card, Divider, Input} from "antd";
import React, {useEffect} from "react";
import {CreateItemIcon} from "../icon/CreateItemIcon";
import {DeleteItemIcon} from "../icon/DeleteItemIcon";
import {SubmitIcon} from "../icon/SubmitIcon";
import {Centered} from "../layout/Centered";
import {Form} from "./Form";
import {useFormContext} from "./FormContext";
import {FormItem} from "./FormItem";
import {FormList} from "./FormList";
import {FormSubmitButton} from "./FormSubmitButton";
import {Switch} from "./Switch";

export default {
	title: "Leight/Form/Form",
	component: Form,
	argTypes: {},
};

export const SubmitWithRequired = () => (
	<Centered span={14}>
		<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
			<FormItem required field={"login"} children={label => <Input placeholder={label}/>}/>
			<FormItem required field={"password"} children={label => <Input type={"password"} placeholder={label}/>}/>
			<FormSubmitButton title={"Submit!"} icon={<SubmitIcon/>}/>
		</Form>
	</Centered>
);
SubmitWithRequired.parameters = {
	docs: {
		source: {
			code: "...",
		}
	}
};

export const SubmitWithOptional = () => (
	<Centered span={14}>
		<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
			<FormItem field={"some-value"} children={label => <Input placeholder={label}/>}/>
			<FormItem required field={"required-value"} children={label => <Input placeholder={label}/>}/>
			<FormItem field={"another-value"} children={label => <Input placeholder={label}/>}/>
			<FormItem field={["foo", "bar"]}/>
			<FormList field={["some", "internal", "dynamic", "form"]}>
				{(fields, {
					add,
					remove
				}) => (
					<Card>
						{fields.map(field => (
							<div key={field.key}>
								<FormItem key={field.key + ".type"} field={[field.fieldKey, "type"]} fieldKey={[field.fieldKey, "type"]}/>
								<FormItem required key={field.key + ".value"} field={[field.fieldKey, "value"]} fieldKey={[field.fieldKey, "value"]}/>
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
			</FormList>
			<Switch field={"switch"}/>
			<FormSubmitButton title={"Submit!"} icon={<SubmitIcon/>}/>
		</Form>
	</Centered>
);

export const SubmitWithPostInitials = () => {
	const Items = () => {
		const formContext = useFormContext();
		useEffect(() => {
			formContext.block();
			setTimeout(() => {
				formContext.setValues({
					"some-value": "the value",
					"required-value": "required",
				});
				formContext.unblock();
			}, 1250);
		}, []);
		return (
			<>
				<FormItem field={"some-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem required field={"required-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem field={"another-value"} children={label => <Input placeholder={label}/>}/>
				<FormSubmitButton title={"Submit!"} icon={<SubmitIcon/>}/>
			</>
		);
	};

	return (
		<Centered span={14}>
			<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
				<Items/>
			</Form>
		</Centered>
	);
};

export const SubmitWithPostInitialsErrors = () => {
	const Items = () => {
		const formContext = useFormContext();
		useEffect(() => {
			formContext.block();
			const id = setTimeout(() => {
				formContext.setValues({
					"some-value": "the value",
					"required-value": "required",
					"some": {
						"internal": {
							"dynamic": {
								"form": [
									{type: "some-type", value: "some-value"},
									{type: "another thing", value: "aaa nother value"},
								]
							}
						}
					}
				});
				formContext.setErrors({
					errors: [
						{
							id: "another-value",
							error: "boom",
						},
						{
							id: ["some", "internal", "dynamic", "form", 0, "value"],
							error: "It works!",
						}
					]
				});
				formContext.unblock();
			}, 1250);
			return () => clearTimeout(id);
		}, []);
		return (
			<>
				<FormItem field={"some-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem required field={"required-value"} children={label => <Input placeholder={label}/>}/>
				<FormItem field={"another-value"} children={label => <Input placeholder={label}/>}/>
				<FormList field={["some", "internal", "dynamic", "form"]}>
					{(fields, {
						add,
						remove
					}) => (
						<Card>
							{fields.map(field => (
								<div key={field.key}>
									<FormItem key={field.key + ".type"} field={[field.fieldKey, "type"]} fieldKey={[field.fieldKey, "type"]}/>
									<FormItem required key={field.key + ".value"} field={[field.fieldKey, "value"]} fieldKey={[field.fieldKey, "value"]}/>
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
				</FormList>
				<FormSubmitButton title={"Submit!"} icon={<SubmitIcon/>}/>
			</>
		);
	};

	return (
		<Centered span={14}>
			<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
				<Items/>
			</Form>
		</Centered>
	);
};
