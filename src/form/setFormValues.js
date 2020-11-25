import isArray from "isarray";
import isObject from "isobject";

const magic = (form, fields, name = []) => {
	let keys = [];
	for (const [key, value] of
		Object.entries(fields)) {
		const current = [].concat(name, [key]);
		keys = keys.concat([current]);
		if (isArray(value)) {
			for (let i = 0;
				 i < value.length;
				 i++) {
				keys = keys.concat(magic(form, value[i], [].concat(current, [i])));
			}
		} else if (isObject(value)) {
			keys = keys.concat(magic(form, value, current));
		}
	}
	return keys;
};

/**
 * This is quite magic method which will set form values and mark them as untouched.
 *
 * @param form Antd form instance
 * @param data initial values being set
 */
const setFormValues = (form, data) => {
	form.setFieldsValue(data);
	form.setFields(magic(form, data).map(name => ({
		name,
		errors: [],
		validating: false,
		touched: false
	})));
};

export default setFormValues;
