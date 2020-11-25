import hasFormErrors from "./hasFormErrors";

/**
 * Do a check if this form button is enabled by following Form rules:
 * - validations of all fields must pass
 * - all form fields must be touched
 *
 * @param form Antd Form instance
 *
 * @returns {boolean}
 */
const isButtonEnabled = (form) => {
	return form.isFieldsTouched(true) && !hasFormErrors(form);
};

export default isButtonEnabled;
