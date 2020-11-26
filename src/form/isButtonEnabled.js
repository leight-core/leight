import hasFormErrors from "./hasFormErrors";

/**
 * Do a check if this form button is enabled by following Form rules:
 * - validations of all fields must pass
 * - all form fields must be touched
 *
 * @param form Antd Form instance
 * @param fields Array of fields to be checked (for example just required ones)
 *
 * @returns {boolean}
 */
const isButtonEnabled = (form, fields = null) => {
	if (fields) {
		return form.isFieldsTouched(fields, true) && !hasFormErrors(form);
	}
	return form.isFieldsTouched(true) && !hasFormErrors(form);
};

export default isButtonEnabled;
