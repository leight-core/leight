import React, {FC} from "react";
import {ISubmitButtonProps, SubmitButton} from "./SubmitButton";

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
