import {
	Form,
	IFormContext,
	IFormError,
	IFormErrorHandler,
	IFormErrorMap,
	IFormInitialMapper,
	IFormOnFailure,
	IFormOnSuccess,
	IFormPostMapper,
	IFormProps,
	IParams,
	IServerEvents,
	IUpdateCallback,
	ServerEvents,
	useDiscoveryContext,
	useNavigate
} from "@leight-core/leight";
import {message} from "antd";
import {AxiosError, AxiosRequestConfig} from "axios";
import isCallable from "is-callable";
import {PropsWithChildren} from "react";
import {useTranslation} from "react-i18next";

export interface ICommonFormProps<TFormValues = any, TRequest = TFormValues, TResponse = TRequest> extends Partial<Omit<IFormProps<TFormValues>, "name">> {
	/**
	 * Name of the form.
	 */
	name?: string;
	/**
	 * What to do on form submit.
	 */
	post: IUpdateCallback<TRequest, TResponse>;
	/**
	 * Optional POSt param.
	 */
	postParams?: IParams;
	postConfig?: AxiosRequestConfig,
	/**
	 * Map form data to data being sent to server.
	 */
	postMapper?: IFormPostMapper<TFormValues, TRequest>;
	/**
	 * Map data to the initial state of the form (if any).
	 */
	initialMapper?: IFormInitialMapper<TFormValues>;
	/**
	 * Called when a form is successfully committed.
	 */
	onSuccess?: IFormOnSuccess<TFormValues, TResponse>;
	/**
	 * Called when an error occurs.
	 */
	onFailure?: IFormOnFailure;
	mapError?: (error: any, formContext: IFormContext) => IFormErrorMap;
	/**
	 * Optional events if needed to be hooked in.
	 */
	events?: IServerEvents<TResponse>;
}

export function CommonForm<TFormValues extends any = any, TRequest extends any = TFormValues, TResponse extends any = TRequest>(
	{
		post,
		postParams,
		postConfig,
		postMapper = values => values as any,
		initialMapper = () => null as any,
		onSuccess = () => null,
		mapError = () => ({}),
		onFailure,
		events = ServerEvents(),
		...props
	}: PropsWithChildren<ICommonFormProps<TFormValues, TRequest, TResponse>>): JSX.Element {
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
		const map = mapError(error, formContext);
		const formError = map[error];
		const general = map["general"];
		formError && handleError(formError, error, formContext);
		!formError && general && handleError(general, error, formContext);
		!formError && !general && message.error(t(error));
	});

	return <Form<TFormValues>
		colon={false}
		size={"large"}
		onSubmit={(values, formContext) => {
			post(postMapper(values), discoveryContext, postParams, postConfig)
				.chain(formContext.events())
				.chain(events)
				.on("response", data => onSuccess(navigate, values, data), 1000)
				.on("catch", error => onFailure!!((error as AxiosError).response?.data || error, formContext), 1000);
		}}
		labelCol={{span: 8}}
		labelAlign={"left"}
		wrapperCol={{span: 24}}
		scrollToFirstError
		initialValues={initialMapper() as any}
		{...props}
	/>;
}
