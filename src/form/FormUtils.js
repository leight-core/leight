import isarray from "isarray";
import isObject from "isobject";

export const FormUtils = {
	/**
	 * Extract form fields. Promise is used to ensure all fields are in the form (in case of dynamic forms).
	 *
	 * @param {*} form Antd form instance
	 *
	 * @return {Promise}
	 */
	fields: async function (form) {
		return new Promise(resolve => setTimeout(() => resolve(form.getFieldsError().map(item => [item.name, form.getFieldInstance(item.name)])), 0));
	},
	/**
	 * Returns array of [names, Field] of required fields.
	 *
	 * @param {*} form Antd form instance
	 * @return {Promise}
	 */
	required: async function (form) {
		return (await this.fields(form)).filter(([_, item]) => (item ? (item.props ? item.props : {}) : {}).required);
	},
	/**
	 * Try to guess if there are some missing required values on the form.
	 *
	 * @param {*} form Antd form instance
	 *
	 * @returns {Promise<boolean>}
	 */
	hasMissingValues: async function (form) {
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

		return check(form.getFieldsValue((await this.required(form)).map(([name]) => name)));
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
	 * @return {Promise<boolean>}
	 */
	canSubmit: async function (form) {
		return !(await this.hasMissingValues(form)) && !this.hasErrors(form);
	}
};
