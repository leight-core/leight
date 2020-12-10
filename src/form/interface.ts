import {FormInstance} from "antd/lib/form";
import {NamePath} from "rc-field-form/lib/interface";

export type IFormFields = [NamePath, any];

export interface IFormError {
	id: NamePath
	error: string
}

export interface IFormErrors {
	message?: string
	errors: IFormError[]
}

export interface IFormContext<TValues = any> {
	/**
	 * Antd form instance.
	 */
	form: FormInstance
	/**
	 * Current form errors.
	 */
	errors: IFormErrors
	/**
	 * Set field errors.
	 *
	 * @param errors
	 */
	setErrors: (errors: IFormErrors) => void
	/**
	 * Set form values
	 *
	 * @param values values being set
	 */
	setValues: (values: TValues) => void
	/**
	 * Reset form to the initial state.
	 */
	reset: () => void
	/**
	 * Direct access to blocking state of the layout (**not a bool!**).
	 */
	blocking: number
	/**
	 * Tells if there is requested blocking state of the form.
	 */
	isBlocked: () => boolean
	/**
	 * Updates blocking state of the form; could be called more times as it maintains loader count.
	 */
	block: () => void
	/**
	 * Updates blocking state of the form; could be called more times as it maintains loader count.
	 */
	unblock: () => void
}