/**
 * Check if the given form has errors; also just selected fields could be checked.
 *
 * @param form Antd Form instance
 * @param fields Array of fields being checked (or null to check all fields)
 *
 * @returns {boolean}
 */
const hasFormErrors = (form, fields = null) => {
	if (fields) {
		return !!form.getFieldsError(fields).filter(({errors}) => errors.length).length;
	}
	return !!form.getFieldsError().filter(({errors}) => errors.length).length;
};

export default hasFormErrors;
