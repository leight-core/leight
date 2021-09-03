import {
	FormContextProvider,
	IFormContext,
	IFormError,
	IFormErrorHandler,
	IFormErrorMap,
	IFormInitialMapper,
	IFormOnFailure,
	IFormOnSuccess,
	IFormPostMapper,
	IQuery,
	IRequestEvents,
	IUpdateCallback,
	LoaderIcon,
	RequestEvents,
	useDiscoveryContext,
	useFormBlockContext,
	useFormContext,
	useNavigate
} from "@leight-core/leight";
import {Form as CoolForm, FormProps, message, Spin} from "antd";
import {AxiosError, AxiosRequestConfig} from "axios";
import isCallable from "is-callable";
import React, {FC, PropsWithChildren} from "react";
import {useTranslation} from "react-i18next";

export interface IFormProps<TRequest = any, TResponse = TRequest> extends Partial<FormProps> {
	/**
	 * What to do on form submit.
	 */
	post: IUpdateCallback<TRequest, TResponse>;
	/**
	 * Optional POSt param.
	 */
	query?: IQuery;
	/**
	 * Axios request config.
	 */
	axios?: AxiosRequestConfig,
	/**
	 * Map form data to data being sent to server.
	 */
	toPost?: IFormPostMapper<any, TRequest>;
	/**
	 * Map data to the initial state of the form (if any).
	 */
	toForm?: IFormInitialMapper<any>;
	/**
	 * Called when a form is successfully committed.
	 */
	onSuccess?: IFormOnSuccess<any, TResponse>;
	/**
	 * Called when an error occurs.
	 */
	onFailure?: IFormOnFailure;
	/**
	 * Map error from outside to a state in the form (like a general error or a field error).
	 */
	toError?: (error: any, formContext: IFormContext) => IFormErrorMap;
	/**
	 * Optional events if needed to be hooked in.
	 */
	events?: IRequestEvents<TResponse>;
}

const FormInternal: FC<IFormProps> = (
	{
		post,
		query,
		axios,
		toPost = values => values,
		toForm = () => null as any,
		onSuccess = () => null,
		toError = () => ({}),
		onFailure,
		events = RequestEvents(),
		children,
		...props
	}) => {
	const formContext = useFormContext();
	const formBlockContext = useFormBlockContext();
	const discoveryContext = useDiscoveryContext();
	const navigate = useNavigate();
	const {t} = useTranslation();

	function handleError(formError: IFormError | IFormErrorHandler, error: any, formContext: IFormContext) {
		let handle = formError;
		if (!isCallable(handle)) {
			handle = () => formContext.setErrors({
				errors: [
					(formError as IFormError),
				],
			});
		}
		(handle as IFormErrorHandler)(error, formContext);
	}

	onFailure = onFailure || ((error, formContext) => {
		const map = toError(error, formContext);
		const formError = map[error];
		const general = map["general"];
		formError && handleError(formError, error, formContext);
		!formError && general && handleError(general, error, formContext);
		!formError && !general && message.error(t(error));
	});

	return <CoolForm
		colon={false}
		size={"large"}
		onFinish={values => post(toPost(values), discoveryContext, query, axios)
			.chain(formContext.events())
			.chain(events)
			.on("response", data => onSuccess(navigate, values, data), 1000)
			.on("catch", (error: AxiosError) => onFailure && onFailure((error && error.response && error.response.data) || error, formContext), 1000)
		}
		labelCol={{span: 8}}
		labelAlign={"left"}
		wrapperCol={{span: 24}}
		scrollToFirstError
		initialValues={toForm()}
		{...props}
	>
		<Spin indicator={<LoaderIcon/>} spinning={formBlockContext.isBlocked()}>
			{children}
		</Spin>
	</CoolForm>;
};

export function Form<TRequest = any, TResponse = TRequest>(props: PropsWithChildren<IFormProps<TRequest, TResponse>>): JSX.Element {
	return <FormContextProvider>
		<FormInternal {...props}/>
	</FormContextProvider>;
}
