import {IBlockContext, INavigate, IPageRequest, IRequestEvents} from "@leight-core/leight";
import {FormInstance} from "antd";
import {NamePath} from "rc-field-form/lib/interface";

export interface IFormItemContext {
    field: NamePath;
    label: string;
    setValue: (value: any) => void;
    getValue: () => any;
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
     * Create default events handling some things in the form.
     */
    events: <TResponse = any>() => IRequestEvents<TResponse>;
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

export interface IToSearchMapper<TOrderBy, TFilter> {
    (search?: string): IPageRequest<TOrderBy, TFilter>;
}

export interface IToOptionMapper<TItem> {
    (item: TItem): IBaseSelectOption;
}

export interface IFormPostMapper<TFormValues, TRequest> {
    (values: TFormValues): TRequest;
}

export interface IFormInitialMapper<TFormValues> {
    (): TFormValues;
}

export interface IFormOnSuccess<TFormValues, TResponse> {
    (navigate: INavigate, values: TFormValues, data: TResponse): void;
}

export interface IFormOnFailure {
    (error: string, formContext: IFormContext): void;
}

export type IBaseSelectItem = any;
export type IBaseSelectOption = { value: IBaseSelectItem, label: IBaseSelectItem };
export type IBaseGroupSelectOption = { label: IBaseSelectItem, children: IBaseSelectOption[] };
