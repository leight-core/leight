import {action} from "@storybook/addon-actions";
import {Button, Card, DatePicker, Divider} from "antd";
import React, {useEffect} from "react";
import {CreateItemIcon} from "../icon/CreateItemIcon";
import {DeleteItemIcon} from "../icon/DeleteItemIcon";
import {SubmitIcon} from "../icon/SubmitIcon";
import {Centered} from "../layout/Centered";
import {StoryApp} from "../storybook/StoryApp";
import {Form} from "./Form";
import {useFormContext} from "./FormContext";
import {FormItem} from "./FormItem";
import {FormList} from "./FormList";
import {FormSubmitButton} from "./FormSubmitButton";
import {Input} from "./Input";
import {SwitchItem} from "./SwitchItem";

export default {
	title: "Leight/Form/Form",
	component: Form,
	argTypes: {},
};

export const SubmitWithRequired = () => (
	<StoryApp>
		<Centered span={14}>
			<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
				<FormItem required field={"login"} children={<Input usePlaceholder/>}/>
				<FormItem required field={"password"} children={<Input type={"password"} usePlaceholder/>}/>
				<FormSubmitButton label={"Submit!"} icon={<SubmitIcon/>}/>
			</Form>
		</Centered>
	</StoryApp>
);
SubmitWithRequired.parameters = {
	docs: {
		source: {
			code: "...",
		}
	}
};

export const SubmitWithRequiredDate = () => (
	<StoryApp>
		<Centered span={14}>
			<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
				<FormItem required field={"input"} children={<Input usePlaceholder/>}/>
				<FormItem required field={["hidden", "date"]} children={<DatePicker style={{width: "100%"}}/>}/>
				<FormSubmitButton label={"Submit!"} icon={<SubmitIcon/>}/>
			</Form>
		</Centered>
	</StoryApp>
);

export const SubmitWithOptional = () => (
	<StoryApp>
		<Centered span={14}>
			<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
				<FormItem field={"some-value"} children={<Input usePlaceholder/>}/>
				<FormItem required field={"required-value"} children={<Input usePlaceholder/>}/>
				<FormItem field={"another-value"} children={<Input usePlaceholder/>}/>
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
				<SwitchItem field={"switch"}/>
				<FormSubmitButton label={"Submit!"} icon={<SubmitIcon/>}/>
			</Form>
		</Centered>
	</StoryApp>
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
				<FormItem field={"some-value"} children={<Input usePlaceholder/>}/>
				<FormItem required field={"required-value"} children={<Input usePlaceholder/>}/>
				<FormItem field={"another-value"} children={<Input usePlaceholder/>}/>
				<FormItem field={["without", "placeholder"]} children={<Input/>}/>
				<FormSubmitButton label={"Submit!"} icon={<SubmitIcon/>}/>
			</>
		);
	};

	return (
		<StoryApp>
			<Centered span={14}>
				<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
					<Items/>
				</Form>
			</Centered>
		</StoryApp>
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
						},
						{
							id: ["some", "internal", "dynamic", "form", 0, "date"],
							error: "I don't like the thing you provided!!",
						},
					]
				});
				formContext.unblock();
			}, 1250);
			return () => clearTimeout(id);
		}, []);
		return (
			<>
				<FormItem field={"some-value"} children={<Input usePlaceholder/>}/>
				<FormItem required field={"required-value"} children={<Input usePlaceholder/>}/>
				<FormItem field={"another-value"} children={<Input usePlaceholder/>}/>
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
									<FormItem required key={field.key + ".date"} field={[field.fieldKey, "date"]} fieldKey={[field.fieldKey, "date"]} children={<DatePicker/>}/>
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
				<FormSubmitButton label={"Submit!"} icon={<SubmitIcon/>}/>
			</>
		);
	};

	return (
		<StoryApp>
			<Centered span={14}>
				<Form name={"story"} layout={"vertical"} onSubmit={action("onSubmit")}>
					<Items/>
				</Form>
			</Centered>
		</StoryApp>
	);
};
