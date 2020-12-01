import CancelablePromise from "cancelable-promise";
import isarray from "isarray";
import isObject from "isobject";

export const FormUtils = {
	/**
	 * Extract form fields. Promise is used to ensure all fields are in the form (in case of dynamic forms).
	 *
	 * @param {*} form Antd form instance
	 *
	 * @return {CancelablePromise}
	 */
	fields: function (form) {
		return new CancelablePromise(resolve => setTimeout(() => resolve(form.getFieldsError().map(item => [item.name, form.getFieldInstance(item.name)])), 0));
	},
	/**
	 * Returns array of [names, Field] of required fields.
	 *
	 * @param {*} form Antd form instance
	 * @return {CancelablePromise}
	 */
	required: function (form) {
		return new CancelablePromise(resolve => this.fields(form).then(fields => {
			resolve(fields.filter(([_, item]) => (item ? (item.props ? item.props : {}) : {}).required));
		}));
	},
	/**
	 * Try to guess if there are some missing required values on the form.
	 *
	 * @param {*} form Antd form instance
	 *
	 * @returns {CancelablePromise<boolean>}
	 */
	hasMissingValues: function (form) {
		function check(input) {
			for (const value of Object.values(input)) {
				if (value === undefined || value === "" || value === null) {
					return true;
				} else if (isObject(value)) {
					return check(value);
				} else if (isarray(value)) {
					for (const item of value) {
						if (item && check(item)) {
							return true;
						}
					}
				}
			}
			return false;
		}

		return new CancelablePromise(resolve => this.required(form).then(required => {
			resolve(check(form.getFieldsValue(required.map(([name]) => name))));
		}));
	},
	/**
	 * Check if the given form has errors; also just selected fields could be checked.
	 *
	 * @param form Antd Form instance
	 * @param fields Array of fields being checked (or null to check all fields)
	 *
	 * @return {boolean}
	 */
	hasErrors: function (form, fields = null) {
		if (fields) {
			return !!form.getFieldsError(fields).filter(({errors}) => errors.length).length;
		}
		return !!form.getFieldsError().filter(({errors}) => errors.length).length;
	},
	/**
	 * Do a check if this form button is enabled by following Form rules:
	 * - validations of all fields must pass
	 *
	 * @param form Antd Form instance
	 *
	 * @return {CancelablePromise<boolean>}
	 */
	canSubmit: function (form) {
		return new CancelablePromise(resolve => this.hasMissingValues(form).then(bool => {
			resolve(!bool && !this.hasErrors(form));
		}));
	},
	resetError: function (form, value) {
		console.log(value);
	},
};
