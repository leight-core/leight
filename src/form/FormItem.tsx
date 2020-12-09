import {Form, Input} from "antd";
import {FormItemProps, Rule} from "antd/lib/form";
import {NamePath} from "rc-field-form/lib/interface";
import {cloneElement, FC} from "react";
import {useTranslation} from "react-i18next";
import {useFormContext} from "./FormContext";

export interface IFormItem extends Partial<FormItemProps> {
	/**
	 * Field name; also used for translations.
	 */
	field: NamePath
	/**
	 * Attach required validation rule?
	 */
	required?: boolean
	/**
	 * Show Antd Form.Item label.
	 */
	showLabel?: boolean
	/**
	 * Disable default Antd Form.Item margin.
	 */
	noMargin?: boolean
	children?: (label: string) => JSX.Element
	labels?: string[]
}

export const FormItem: FC<IFormItem> = (
	{
		field,
		required = false,
		showLabel = true,
		noMargin = false,
		children = _ => <Input/>,
		labels = [],
		...props
	}) => {
	const {t} = useTranslation();
	if (noMargin) {
		props.style = {margin: 0};
	}
	const formContext = useFormContext();
	if (!formContext) {
		throw new Error("FormItem must be used with FormContext (for example Form component from leight-core package).");
	}
	const fieldName = Array.isArray(field) ? field.join(".") : field;
	const rules: Rule[] = [];
	if (required) {
		rules.push({
			required: true,
			message: t(["form-item." + fieldName + ".required"].concat(labels.map(item => item + ".required"))) as string,
		});
	}
	/**
	 * This is... a hack I really don't understand! But it works.
	 *
	 * The idea is to clear errors set from form context and this solution could do that with ease!
	 */
	rules.push(() => ({validator: () => Promise.resolve()}));
	return (
		<Form.Item
			name={field}
			label={showLabel === false ? null : t(["form-item." + fieldName + ".label"].concat(labels))}
			rules={rules}
			children={cloneElement(children(t(["form-item." + fieldName + ".label"].concat(labels)) as string), {["data-required"]: required})}
			{...props}
		/>
	);
};
