import {Input} from "antd";
import {PasswordProps} from "antd/lib/input";
import {FC} from "react";
import {useOptionalFormItemContext} from "./FormItemContext";

export interface IPasswordInputProps extends Partial<PasswordProps> {
	usePlaceholder?: boolean
}

export const PasswordInput: FC<IPasswordInputProps> = ({usePlaceholder, ...props}) => {
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	return (
		<Input.Password {...props}/>
	);
};
