import {FormInstance} from "antd/lib/form";
import CancelablePromise, {CancelablePromiseType} from "cancelable-promise";
import {FieldData, NamePath} from "rc-field-form/lib/interface";

export type IFormFields = [NamePath, any];
export type IFlatField = {
	field: NamePath
	value: any
}

export const FormUtils = {
	/**
	 * Extract form fields. Promise is used to ensure all fields are in the form (in case of dynamic forms).
	 *
	 * @param form Antd form instance
	 */
	fields: function (form: FormInstance): CancelablePromiseType<IFormFields[]> {
		return new CancelablePromise(resolve => setTimeout(() => resolve(form.getFieldsError().map(item => [item.name, form.getFieldInstance(item.name)]) as IFormFields), 0));
	},
	/**
	 * Returns array of [names, Field] of required fields.
	 *
	 * @param form Antd form instance
	 */
	required: function (form: FormInstance): CancelablePromiseType<IFormFields[]> {
		return new CancelablePromise(resolve => this.fields(form).then(fields => {
			resolve(fields.filter(([_, item]) => (item ? (item.props ? item.props : {}) : {})["data-required"]));
		}));
	},
	/**
	 * Try to guess if there are some missing required values on the form.
	 *
	 * @param form Antd form instance
	 */
	hasMissingValues: function (form: FormInstance): CancelablePromiseType<boolean> {
		return new CancelablePromise(resolve => this.required(form).then(required => {
			resolve(!!required.map(([name, _]) => name).map(name => form.getFieldValue(name)).filter(value => !value).length);
		}));
	},
	/**
	 * Check if the given form has errors; also just selected fields could be checked.
	 *
	 * @param form Antd Form instance
	 * @param fields Array of fields being checked (or null to check all fields)
	 */
	hasErrors: function (form: FormInstance, fields?: NamePath[]): boolean {
		return !!form.getFieldsError(fields).filter(({errors}) => errors.length).length;
	},
	/**
	 * Do a check if this form button is enabled by following Form rules:
	 * - validations of all fields must pass
	 *
	 * @param form Antd Form instance
	 */
	canSubmit: function (form: FormInstance): CancelablePromiseType<boolean> {
		return new CancelablePromise(resolve => this.hasMissingValues(form).then(bool => {
			resolve(!bool && !this.hasErrors(form));
		}));
	},
	/**
	 * Reset errors value; input is submitted form object (thus object structure is the structure
	 * of checked fields).
	 *
	 * @param form
	 * @param fields
	 */
	resetError: function (form: FormInstance, fields: FieldData[]) {
		/**
		 * Filter out errors with props.error (custom errors from the form); rest should stay (set by something else, maintained by something else).
		 */
		// console.log(form.getFieldsError(fields.map(field => field.name)).map(item => item.errors));
		form.setFields(fields.map(field => ({
			name: field.name,
			errors: [],
		})));
	},
};
