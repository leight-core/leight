import {IBlockContext, INavigate} from "@leight-core/leight";
import {FormInstance} from "antd";
import CancelablePromise from "cancelable-promise";
import {NamePath} from "rc-field-form/lib/interface";

export interface IFormItemContext {
	field: NamePath;
	label: string;
	setValue: (value: any) => void;
	getValue: () => any;
	setErrors: (errors: string[]) => void;
}

export type IFormFields = [NamePath, any];

export interface IFormError {
	id: NamePath;
	error: string;
}

export interface IErrorHandler<TError, TFormValues> {
	error: TError;
	formContext: IFormContext<TFormValues>;
}

export interface IFormErrorHandler<TError, TFormValues> {
	(error: IErrorHandler<TError, TFormValues>): void;
}

export interface IFormErrorMap<TFormValues> {
	[index: string]: IFormError | IFormErrorHandler<any, TFormValues>;
}

export interface IFormErrors {
	message?: string;
	errors: IFormError[];
}

export interface IFormContext<TValues = any> {
	/**
	 * Antd form instance.
	 */
	readonly form: FormInstance;
	/**
	 * Current form errors.
	 */
	readonly errors: IFormErrors;
	/**
	 * Set field errors.
	 *
	 * @param errors
	 */
	setErrors: (errors: IFormErrors) => void;
	/**
	 * Set form values
	 *
	 * @param values values being set
	 */
	setValues: (values: TValues) => void;
	/**
	 * Reset form to the initial state.
	 */
	reset: () => void;
	/**
	 * Return current form values.
	 */
	values: () => any;
	/**
	 * Throw away all error messages of all fields.
	 */
	resetErrors: () => void;
	/**
	 * Force form refresh (just revalidate and reset fields to get current sync with visible fields).
	 */
	refresh: () => void;
	/**
	 * Quick access to form's blocking context.
	 */
	readonly blockContext: IBlockContext;
	/**
	 * Resolve with true or false.
	 */
	canSubmit: (then?: (canSubmit: boolean) => void) => CancelablePromise<boolean>;
}

export interface IToOptionMapper<TItem> {
	(item: TItem): IBaseSelectOption;
}

export interface IFormMutationMapper<TFormValues, TRequest> {
	(values: TFormValues): TRequest;
}

export interface IFormInitialMapper<TFormValues> {
	(): TFormValues;
}

export interface IFormSuccess<TFormValues, TResponse> {
	navigate: INavigate;
	values: TFormValues;
	response: TResponse;
	formContext: IFormContext<TFormValues>;
}

export interface IFormOnSuccess<TFormValues, TResponse> {
	(success: IFormSuccess<TFormValues, TResponse>): void;
}

export interface IFormFailure<TFormValues> {
	error: string;
	formContext: IFormContext<TFormValues>;
}

export interface IFormOnFailure<TFormValues> {
	(failure: IFormFailure<TFormValues>): void;
}

export interface IToError<TError, TFormValues> {
	error: TError;
	formContext: IFormContext<TFormValues>;
}

export type IBaseSelectItem = any;
export type IBaseSelectOption = { value: IBaseSelectItem, label: IBaseSelectItem };

export interface IFilterContext<TFilter = any> {
	filter: TFilter;
	setFilter: (filter?: TFilter) => void;
}
