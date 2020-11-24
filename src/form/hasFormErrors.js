const hasFormErrors = (form) => {
	return form.getFieldsError().filter(({errors}) => errors.length).length;
};

export default hasFormErrors;
