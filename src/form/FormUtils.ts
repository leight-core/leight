import {FormInstance} from "antd";
import CancelablePromise, {CancelablePromiseType} from "cancelable-promise";
import {NamePath} from "rc-field-form/lib/interface";
import {IFormFields} from "./interface";

export const FormUtils = {
	/**
	 * Extract form fields. Promise is used to ensure all fields are in the form (in case of dynamic forms).
	 *
	 * @param form Antd form instance
	 */
	fields: function (form: FormInstance): CancelablePromiseType<IFormFields[]> {
		return new CancelablePromise(resolve => setTimeout(() => {
			resolve(form.getFieldsError().map(item => {
				return [item.name, form.getFieldInstance(item.name)];
			}));
		}, 0));
	},
	/**
	 * Returns array of [names, Field] of required fields.
	 *
	 * @param form Antd form instance
	 */
	required: function (form: FormInstance): CancelablePromiseType<IFormFields[]> {
		return new CancelablePromise(resolve => this.fields(form).then(fields => {
			resolve(fields.filter(([_, item]) => {
				if (!item) {
					return false;
				}
				if (item.dataset) {
					return item.dataset.required === "true";
				} else if (item.props) {
					return !!item.props["data-required"];
				}
				return false;
			}));
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
};
