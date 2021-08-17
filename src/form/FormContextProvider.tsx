import {BlockContextClass, FormBlockContext, FormContext, FormUtils, IFormErrors, IFormFields, ServerEvents, useBlockContext} from "@leight-core/leight";
import {Form as CoolForm, message} from "antd";
import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";

export interface IFormContextProviderProps {
}

export const FormContextProvider: FC<IFormContextProviderProps> = ({children}) => {
	const blockContext = useBlockContext();
	const {t} = useTranslation();
	const [errors, setErrors] = useState<IFormErrors>();
	const [form] = CoolForm.useForm();

	const setErrorsInternal = (errors: IFormErrors) => {
		setErrors(errors);
		errors.message && message.error(t("error." + errors.message));
		console.info("errors", errors);
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
				form,
				errors: errors as IFormErrors,
				setErrors: setErrorsInternal,
				setValues: values => form.setFieldsValue(values),
				reset: () => form.resetFields(),
				events: () => ServerEvents()
					.on("request", () => {
						formBlockContext.block();
						blockContext.block();
					})
					.on("http400", setErrorsInternal)
					.on("http401", setErrorsInternal)
					.on("http403", setErrorsInternal)
					.on("http500", () => setErrorsInternal({
						message: t("common.form.server-error"),
						errors: [],
					}))
					.on("catch", e => {
						console.error(e);
					})
					.on("done", () => {
						formBlockContext.unblock();
						blockContext.unblock();
					}),
				values: form.getFieldsValue,
				resetErrors,
				refresh: () => form.validateFields().then(() => resetErrors(), () => resetErrors()),
				blockContext: formBlockContext,
			}}
		>
			{children}
		</FormContext.Provider>
	</FormBlockContext.Provider>;
};
