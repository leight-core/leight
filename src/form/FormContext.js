import {FormInstance} from "antd/lib/form";
import {createContext, useContext} from "react";

/**
 * @typedef {Object} FormErrorType
 * @property {string|string[]} field
 * @property {string} message
 */
/**
 * @typedef {Object} FormErrorsType
 * @property {string} message
 * @property {string} type
 * @property {FormErrorType[]} errors
 */
/**
 * @typedef {function} FormSetErrorsType
 * @param {FormErrorsType} errors
 */
/**
 * @typedef {Object} FormContextType
 * @property {Object} form Antd Form instance (https://ant.design/components/form/#FormInstance)
 * @property {FormErrorsType} errors form validation errors
 * @property {FormSetErrorsType} setErrors directly set form errors (validation errors)
 * @property {FormContextSetValuesType} setValues set form values (shortcut method)
 */
/**
 * @typedef {function} FormContextSetValuesType
 * @param {Object} values
 */
/**
 * Access to current Form Context; do not use this directly, see {@link useFormContext}.
 *
 * @type {React.Context<FormContextType>}
 */
export const FormContext = createContext(null);

/**
 * @param {*} form Antd form instance
 * @param errors state holding current form errors
 * @param setErrors method for direct change of errors state
 * @param setValues method for setting form values
 *
 * @return {FormContextType}
 */
export const createFormContext = (form, errors, setErrors, setValues) => ({
	form,
	errors,
	setErrors,
	setValues,
});

interface IFormContext {
	/**
	 * Antd form instance.
	 */
	form: FormInstance,
	/**
	 * Current form errors.
	 */
	errors: any,

	/**
	 * Set field errors.
	 *
	 * @param errors an error object
	 */
	setErrors(errors: any): void,

	/**
	 * Set form values
	 * @param values values being set
	 */
	setValues(values: any): void,
}

/**
 * Form context is useful for creating any kind of form as it provides a lot of useful
 * features.
 */
export const useFormContext = (): IFormContext => useContext(FormContext);
