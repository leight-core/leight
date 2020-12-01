import React, {useContext} from "react";

/**
 * @typedef {Object} FormValidationType
 * @property {string} status
 * @property {string} message
 */
/**
 * @typedef {Object.<String, FormValidationType>} FormValidationsType
 */
/**
 * @typedef {function} FormSetValidationsType
 * @param {FormSetValidationsType} errors
 */
/**
 * @typedef {Object} FormContextType
 * @property {Object} form Antd Form instance (https://ant.design/components/form/#FormInstance)
 * @property {FormValidationsType} errors form validation errors
 * @property {FormSetValidationsType} setErrors directly set form errors (validation messages)
 */
/**
 * Access to current Form Context; do not use this directly, see {@link useFormContext}.
 *
 * @type {React.Context<FormContextType>}
 */
export const FormContext = React.createContext(null);

/**
 * @param {*} form Antd form instance
 * @param errors state holding current form errors
 * @param setErrors method for direct change of errors state
 *
 * @return {FormContextType}
 */
export const createFormContext = (form, errors, setErrors) => ({
	form,
	errors,
	setErrors,
});

/**
 * Form context is useful for creating any kind of form as it provides a lot of useful
 * features.
 *
 * @return {FormContextType}
 */
export const useFormContext = () => useContext(FormContext);
