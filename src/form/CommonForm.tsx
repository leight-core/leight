import {Form, IFormContext, IFormErrorMap, IFormInitialMapper, IFormOnFailure, IFormOnSuccess, IFormPostMapper, IFormProps, IParams, IServerEvents, IUpdateCallback, ServerEvents, useDiscoveryContext, useNavigate} from "@leight-core/leight";
import {message} from "antd";
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
	onFailure = onFailure || ((error, formContext) => {
		const map = mapError(error, formContext);
		const formError = map[error?.data];
		formContext.setErrors({
			errors: [
				formError,
			],
		});
		!formError && message.error(t(map["general"].error || error));
	});
	return <Form<TFormValues>
		colon={false}
		size={"large"}
		onSubmit={(values, formContext) => {
			post(postMapper(values), discoveryContext, postParams)
				.chain(formContext.events())
				.chain(events)
				.on("response", data => onSuccess(navigate, values, data), 1000)
				.on("catch", error => onFailure!!(error.response || error, formContext), 1000);
		}}
		labelCol={{span: 8}}
		labelAlign={"left"}
		wrapperCol={{span: 24}}
		scrollToFirstError
		initialValues={initialMapper() as any}
		{...props}
	/>;
}
