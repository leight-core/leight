import {BlockContextClass, FormBlockContext, FormContext, FormUtils, IFormErrors, IFormFields} from "@leight-core/leight";
import {Form as CoolForm, message} from "antd";
import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";

export interface IFormContextProviderProps {
	translation?: string;
}

export const FormContextProvider: FC<IFormContextProviderProps> = ({translation, ...props}) => {
	const {t} = useTranslation();
	const [errors, setErrors] = useState<IFormErrors>();
	const [form] = CoolForm.useForm();

	const setErrorsInternal = (errors: IFormErrors) => {
		setErrors(errors);
		errors.message && message.error(t("error." + errors.message));
		form.setFields(((errors || {}).errors || []).map(item => ({
			name: item.id,
			errors: [t("error." + item.error)],
		})));
	};

	const resetErrors = () => FormUtils.fields(form).then((fields: IFormFields[]) => fields.map(([field]) => form.setFields([{errors: [], name: field}])));

	const formBlockContext = new BlockContextClass(useState<boolean>(false), useState<number>(0));

	return <FormBlockContext.Provider
		value={formBlockContext}
	>
		<FormContext.Provider
			value={{
				translation,
				form,
				errors: errors as IFormErrors,
				setErrors: setErrorsInternal,
				setValues: values => form.setFieldsValue(values),
				reset: () => form.resetFields(),
				values: form.getFieldsValue,
				resetErrors,
				refresh: () => form.validateFields().then(resetErrors, resetErrors),
				blockContext: formBlockContext,
				canSubmit: (then?: (canSubmit: boolean) => void) => {
					const promise = FormUtils.canSubmit(form);
					then && promise.then(then);
					return promise;
				},
			}}
			{...props}
		/>
	</FormBlockContext.Provider>;
};
