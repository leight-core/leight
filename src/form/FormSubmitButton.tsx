import {ISubmitButtonProps, SubmitButton} from "@leight-core/leight";
import React, {FC} from "react";

export interface IFormSubmitButtonProps extends ISubmitButtonProps {
}

/**
 * Explicit form submit button as it really submits parent form.
 *
 * Internally just sets htmlType of the underlying SubmitButton.
 */
export const FormSubmitButton: FC<IFormSubmitButtonProps> = (props) => {
	return <SubmitButton htmlType={"submit"} {...props}/>;
};
