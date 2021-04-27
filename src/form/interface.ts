import {FormInstance} from "antd";
import {NamePath, ValidateErrorEntity} from "rc-field-form/lib/interface";
import {INavigate} from "../router/interface";
import {IServerEvents} from "../server/interface";

export interface IFormItemContext {
	field: NamePath
	label: string
}

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
	readonly form: FormInstance
	/**
	 * Current form errors.
	 */
	readonly errors: IFormErrors
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
	readonly blocking: number
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
	/**
	 * Create default events handling some things in the form.
	 */
	events: <TResponse = any>() => IServerEvents<TResponse>
	/**
	 * Return current form values.
	 */
	values: () => any
}

export interface IFormSubmitCallback<TValues> {
	(values: TValues, formContext: IFormContext): void
}

export interface IFormSubmitFailedCallback<TValues> {
	(errorInfo: ValidateErrorEntity<TValues>, formContext: IFormContext): void
}

export interface IFormHandleFetchCallback<TValues = any> {
	(formContext: IFormContext, data: TValues): void
}

export interface IFormPostMapper<TFormValues, TRequest> {
	(values: TFormValues): TRequest
}

export interface IFormInitialMapper<TFormValues> {
	(): TFormValues
}

export interface IFormOnSuccess<TFormValues, TResponse> {
	(navigate: INavigate, values: TFormValues, data: TResponse): void
}

export type IBaseSelectItem = any;
export type IBaseSelectOption = { value: IBaseSelectItem, label: IBaseSelectItem };
export type IBaseGroupSelectOption = { label: IBaseSelectItem, children: IBaseSelectOption[] };
