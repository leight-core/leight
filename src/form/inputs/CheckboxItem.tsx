import {FormItem, IFormItemProps} from "@leight-core/leight";
import {Checkbox as CoolCheckbox, CheckboxProps} from "antd";
import {NamePath} from "rc-field-form/lib/interface";
import React, {FC} from "react";

export interface ICheckboxItemProps extends Partial<IFormItemProps> {
	/**
	 * Field name:
	 *
	 * - https://ant.design/components/form/#NamePath
	 */
	field: NamePath;
	labels?: string[];
	checkboxProps?: Partial<CheckboxProps>;
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
export const CheckboxItem: FC<ICheckboxItemProps> = ({field, labels = [], checkboxProps, ...props}) => {
	return (
		<FormItem
			field={field}
			valuePropName={"checked"}
			labels={labels}
			{...props}
			children={<CoolCheckbox {...checkboxProps}/>}
		/>
	);
};
