import React, {useContext} from "react";

/**
 * @typedef {Object} FormValidationType
 * @property {string|string[]} field
 * @property {string} status
 * @property {string} message
 */
/**
 * @typedef {FormValidationType[]} FormValidationsType
 */
/**
 * @typedef {Object} FormMessagesType
 * @property {string} message
 * @property {string} type
 * @property {FormValidationsType} validations
 */
/**
 * @typedef {function} FormSetValidationsType
 * @param {FormMessagesType} errors
 */
/**
 * @typedef {Object} FormContextType
 * @property {Object} form Antd Form instance (https://ant.design/components/form/#FormInstance)
 * @property {FormMessagesType} errors form validation errors
 * @property {FormSetValidationsType} setErrors directly set form errors (validation errors)
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
export const FormContext = React.createContext(null);

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

/**
 * Form context is useful for creating any kind of form as it provides a lot of useful
 * features.
 *
 * @return {FormContextType}
 */
export const useFormContext = () => useContext(FormContext);
