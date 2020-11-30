import React, {useContext} from "react";

/**
 * @typedef {Object} FormContextType
 * @property {Object} form Antd Form instance (https://ant.design/components/form/#FormInstance)
 */

/**
 * Access to current Form Context; do not use this directly, see {@link useFormContext}.
 *
 * @type {React.Context<FormContextType>}
 */
export const FormContext = React.createContext(null);

/**
 * @param {*} form Antd form instance
 *
 * @return {FormContextType}
 */
export const createFormContext = (form) => ({
	form,
});

/**
 * Form context is useful for creating any kind of form as it provides a lot of useful
 * features.
 *
 * @return {FormContextType}
 */
export const useFormContext = () => useContext(FormContext);
