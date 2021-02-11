import {FormInstance} from "antd";
import {NamePath, ValidateErrorEntity} from "rc-field-form/lib/interface";
import {INavigate} from "../router/interface";
import {IServerEvents} from "../server/interface";
import {IEvents} from "../utils/interface";

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

	/**
	 * Create default events handling some things in the form.
	 */
	events: <T extends IServerEvents>() => IEvents<T>
}

export type IFormSubmitCallback<TValues> = (values: TValues, formContext: IFormContext) => void
export type IFormSubmitFailedCallback<TValues> = (errorInfo: ValidateErrorEntity<TValues>, formContext: IFormContext) => void
export type IFormHandleFetchCallback<TValues = any> = (formContext: IFormContext, data: TValues) => void

export type IFormPostMapper<TData extends Object, TValues extends Object> = (data: TData | null, values: TValues) => any;
export type IFormInitialMapper<TData extends Object, TValues extends Object> = (data: TData | null) => TValues
export type IFormOnSuccess<TData extends Object> = (navigate: INavigate, data: TData) => void

export type IBaseSelectOption = { value: string | number, label: string | number };
