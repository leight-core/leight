import {IBlockContext, INavigate, IQueryParams} from "@leight-core/leight";
import {FormInstance} from "antd";
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

export interface IFormErrorHandler {
	(error: any, formContext: IFormContext): void;
}

export interface IFormErrorMap {
	[index: string]: IFormError | IFormErrorHandler;
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

export interface IFormSuccess<TFormValues, TResponse, TQuery extends IQueryParams = IQueryParams> {
	navigate: INavigate<TQuery>;
	values: TFormValues;
	data: TResponse;
	formContext: IFormContext<TFormValues>;
}

export interface IFormOnSuccess<TFormValues, TResponse, TQuery extends IQueryParams = IQueryParams> {
	(success: IFormSuccess<TFormValues, TResponse, TQuery>): void;
}

export interface IFormFailure<TFormValues> {
	error: string;
	formContext: IFormContext<TFormValues>;
}

export interface IFormOnFailure<TFormValues> {
	(failure: IFormFailure<TFormValues>): void;
}

export type IBaseSelectItem = any;
export type IBaseSelectOption = { value: IBaseSelectItem, label: IBaseSelectItem };
