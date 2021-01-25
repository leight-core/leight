import {Checkbox as CoolCheckbox, CheckboxProps} from "antd";
import {NamePath} from "rc-field-form/lib/interface";
import React, {FC} from "react";
import {FormItem} from "./FormItem";

export interface ICheckboxItemProps extends Partial<CheckboxProps> {
	/**
	 * Field name:
	 *
	 * - https://ant.design/components/form/#NamePath
	 */
	field: NamePath
	labels?: string[]
}

/**
 * This one is just a tiny wrapper around common FormItem providing right binding to value props.
 *
 * Rest of props are sent to Antd SwitchItem component.
 *
 * Others:
 *
 * - https://ant.design/components/checkbox/
 */
export const CheckboxItem: FC<ICheckboxItemProps> = ({field, labels = [], ...props}) => {
	return (
		<FormItem
			field={field}
			valuePropName={"checked"}
			labels={labels}
			initialValue={false}
			children={_ => <CoolCheckbox {...props}/>}
		/>
	);
};
