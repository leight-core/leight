import {Form, IFormInitialMapper, IFormOnError, IFormOnSuccess, IFormPostMapper, IFormProps, IParams, IServerEvents, IUpdateCallback, ServerEvents, useDiscoveryContext, useNavigate} from "@leight-core/leight";
import {PropsWithChildren} from "react";

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
	onFailure?: IFormOnError;
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
		onFailure = () => null,
		events = ServerEvents(),
		...props
	}: PropsWithChildren<ICommonFormProps<TFormValues, TRequest, TResponse>>): JSX.Element {
	const discoveryContext = useDiscoveryContext();
	const navigate = useNavigate();
	return <Form<TFormValues>
		colon={false}
		size={"large"}
		onSubmit={(values, formContext) => {
			post(postMapper(values), discoveryContext, postParams)
				.chain(formContext.events())
				.chain(events)
				.on("response", data => onSuccess(navigate, values, data), 1000)
				.on("catch", error => onFailure(error.response, formContext, navigate), 1000);
		}}
		labelCol={{span: 8}}
		labelAlign={"left"}
		wrapperCol={{span: 24}}
		scrollToFirstError
		initialValues={initialMapper() as any}
		{...props}
	/>;
}
