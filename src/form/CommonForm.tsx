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
	IQuery,
	IRequestEvents,
	IUpdateCallback,
	RequestEvents,
	useDiscoveryContext,
	useNavigate
} from "@leight-core/leight";
import {message} from "antd";
import {AxiosError, AxiosRequestConfig} from "axios";
import isCallable from "is-callable";
import {PropsWithChildren} from "react";
import {useTranslation} from "react-i18next";

export interface ICommonFormProps<TRequest = any, TResponse = TRequest> extends Partial<Omit<IFormProps, "name">> {
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
	query?: IQuery;
	postConfig?: AxiosRequestConfig,
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
	toError?: (error: any, formContext: IFormContext) => IFormErrorMap;
	/**
	 * Optional events if needed to be hooked in.
	 */
	events?: IRequestEvents<TResponse>;
}

export function CommonForm<TRequest = any, TResponse = TRequest>(
	{
		post,
		query,
		postConfig,
		toPost = values => values,
		toForm = () => null as any,
		onSuccess = () => null,
		toError = () => ({}),
		onFailure,
		events = RequestEvents(),
		...props
	}: PropsWithChildren<ICommonFormProps<TRequest, TResponse>>): JSX.Element {
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

	return <Form
		colon={false}
		size={"large"}
		onSubmit={(values, formContext) => {
			post(toPost(values), discoveryContext, query, postConfig)
				.chain(formContext.events())
				.chain(events)
				.on("response", data => onSuccess(navigate, values, data), 1000)
				.on("catch", (error: AxiosError) => onFailure!!((error && error.response && error.response.data) || error, formContext), 1000);
		}}
		labelCol={{span: 8}}
		labelAlign={"left"}
		wrapperCol={{span: 24}}
		scrollToFirstError
		initialValues={toForm() as any}
		{...props}
	/>;
}
