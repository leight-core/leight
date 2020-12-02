import {FormInstance} from "antd/lib/form";
import CancelablePromise, {CancelablePromiseType} from "cancelable-promise";
import flatten from "flat";
import {NamePath} from "rc-field-form/lib/interface";

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
		return new CancelablePromise(resolve => this.fields(form).then((fields) => {
			resolve(fields.filter(([_, item]) => (item ? (item.props ? item.props : {}) : {}).required));
		}));
	},
	flatten: function (value: Object): IFlatField[] {
		const delimiter = "::$";
		return Object.entries(flatten(value, {
			delimiter,
		})).map(([name, value]) => ({
			field: name.split(delimiter),
			value,
		}));
	},
	/**
	 * Try to guess if there are some missing required values on the form.
	 *
	 * @param form Antd form instance
	 */
	hasMissingValues: function (form: FormInstance): CancelablePromiseType<boolean> {
		return new CancelablePromise(resolve => this.required(form).then(required => {
			resolve(!!this.flatten(form.getFieldsValue(required.map(([name, _]) => name))).filter(field => !field.value).length);
		}));
	},
	/**
	 * Check if the given form has errors; also just selected fields could be checked.
	 *
	 * @param form Antd Form instance
	 * @param fields Array of fields being checked (or null to check all fields)
	 */
	hasErrors: function (form: FormInstance, fields: NamePath[] = null): boolean {
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
	 * @param value
	 */
	resetError: function (form: FormInstance, value: Object) {
		form.setFields(this.flatten(value).map(field => {
			return ({
				name: field.field,
				errors: [],
			});
		}));
	},
};
