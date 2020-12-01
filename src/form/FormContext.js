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
 * @typedef {Object} FormMessagesType
 * @property {string} message
 * @property {string} type
 * @property {FormValidationsType} validations
 */
/**
 * @typedef {function} FormSetValidationsType
 * @param {FormMessagesType} messages
 */
/**
 * @typedef {Object} FormContextType
 * @property {Object} form Antd Form instance (https://ant.design/components/form/#FormInstance)
 * @property {FormMessagesType} messages form validation messages
 * @property {FormSetValidationsType} setMessages directly set form messages (validation messages)
 */
/**
 * Access to current Form Context; do not use this directly, see {@link useFormContext}.
 *
 * @type {React.Context<FormContextType>}
 */
export const FormContext = React.createContext(null);

/**
 * @param {*} form Antd form instance
 * @param messages state holding current form messages
 * @param setMessages method for direct change of messages state
 *
 * @return {FormContextType}
 */
export const createFormContext = (form, messages, setMessages) => ({
	form,
	messages,
	setMessages,
});

/**
 * Form context is useful for creating any kind of form as it provides a lot of useful
 * features.
 *
 * @return {FormContextType}
 */
export const useFormContext = () => useContext(FormContext);
