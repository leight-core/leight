import {FormInstance} from "antd/lib/form";
import {NamePath} from "rc-field-form/lib/interface";
import {createContext, useContext} from "react";

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
	 * Direct access to loading state of the layout (**not a bool!**).
	 */
	loading: number
	/**
	 * Tells if there is requested loading state of the form.
	 */
	isLoading: () => boolean
	/**
	 * Updates loading state of the form; could be called more times as it maintains loader count.
	 */
	loadingStart: () => void
	/**
	 * Updates loading state of the form; could be called more times as it maintains loader count.
	 */
	loadingFinish: () => void
}

/**
 * Access to current Form Context; do not use this directly, see {@link useFormContext}.
 */
export const FormContext = createContext<IFormContext>(null as unknown as IFormContext);

/**
 * Form context is useful for creating any kind of form as it provides a lot of useful
 * features.
 */
export const useFormContext = <TValues>() => useContext<IFormContext<TValues>>(FormContext);
