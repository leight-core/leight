import {Form as CoolForm, message} from "antd";
import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLayoutContext} from "../layout/LayoutContext";
import {ServerEvents} from "../server/ServerEvents";
import {FormContext} from "./FormContext";
import {IFormErrors} from "./interface";

export interface IFormContextProviderProps {
}

export const FormContextProvider: FC<IFormContextProviderProps> = ({children}) => {
	const layoutContext = useLayoutContext();
	const {t} = useTranslation();
	const [errors, setErrors] = useState<IFormErrors>();
	const [blocking, setBlocking] = useState<number>(0);
	const isBlocked = () => blocking > 0;
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

	const block = () => setBlocking(prev => prev + 1);
	const unblock = () => setBlocking(prev => prev - 1);

	return (
		<FormContext.Provider
			value={{
				form,
				errors: errors as IFormErrors,
				setErrors: setErrorsInternal,
				setValues: values => form.setFieldsValue(values),
				reset: () => form.resetFields(),
				blocking,
				isBlocked,
				block,
				unblock,
				events: () => ServerEvents()
					.on("request", () => {
						block();
						layoutContext.blockContext.block();
					})
					.on("http400", errors => setErrorsInternal(errors))
					.on("http500", () => setErrorsInternal({
						message: t("common.form.server-error"),
						errors: [],
					}))
					.on("catch", () => layoutContext.blockContext.unblock(true))
					.on("done", () => {
						unblock();
						layoutContext.blockContext.unblock();
					}),
				values: form.getFieldsValue
			}}
			children={children}
		/>
	);
};
