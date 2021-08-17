import {useOptionalFormItemContext} from "@leight-core/leight";
import {Input} from "antd";
import {PasswordProps} from "antd/lib/input";
import {FC, forwardRef} from "react";

export interface IPasswordInputProps extends Partial<PasswordProps> {
	usePlaceholder?: boolean;
}

export const PasswordInput: FC<IPasswordInputProps> = forwardRef(({usePlaceholder, ...props}, ref) => {
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	return <Input.Password ref={ref as any} {...props}/>;
});
