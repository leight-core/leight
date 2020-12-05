import React, {FC} from "react";
import {ISubmitButton, SubmitButton} from "./SubmitButton";

export interface IFormSubmitButton extends ISubmitButton {
}

/**
 * Explicit form submit button as it really submits parent form.
 *
 * Internally just sets htmlType of the underlying SubmitButton.
 */
export const FormSubmitButton: FC<IFormSubmitButton> = (props) => {
	return <SubmitButton htmlType={"submit"} {...props}/>;
};
