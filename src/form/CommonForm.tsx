import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IParams} from "../interface/interface";
import {useRouterContext} from "../router/RouterContext";
import {IServerEvents, IUpdateCallback} from "../server/interface";
import {ServerEvents} from "../server/ServerEvents";
import {Form, IFormProps} from "./Form";
import {IFormInitialMapper, IFormOnSuccess, IFormPostMapper} from "./interface";

export interface ICommonFormProps<TFormValues = any, TRequest = TFormValues, TResponse = TRequest> extends Partial<Omit<IFormProps<TFormValues>, "name">> {
	/**
	 * Name of the form.
	 */
	name?: string
	/**
	 * What to do on form submit.
	 */
	post: IUpdateCallback<TRequest, TResponse>
	/**
	 * Optional POSt param.
	 */
	postParams?: IParams
	/**
	 * Map form data to data being sent to server.
	 */
	postMapper?: IFormPostMapper<TFormValues, TRequest>
	/**
	 * Map data to the initial state of the form (if any).
	 */
	initialMapper?: IFormInitialMapper<TFormValues>
	/**
	 * Called when a form is successfully committed.
	 */
	onSuccess?: IFormOnSuccess<TFormValues, TResponse>
	/**
	 * Optional events if needed to be hooked in.
	 */
	events?: IServerEvents<TResponse>
}

export const CommonForm = <TFormValues extends any = any, TRequest extends any = TFormValues, TResponse extends any = TRequest>(
	{
		post,
		postParams,
		postMapper = values => values as any,
		initialMapper = () => null as any,
		onSuccess = () => null,
		events = ServerEvents(),
		...props
	}: ICommonFormProps<TFormValues, TRequest, TResponse>) => {
	const discoveryContext = useDiscoveryContext();
	const navigate = useRouterContext().useNavigate();
	return (
		<Form<TFormValues>
			colon={false}
			size={"large"}
			onSubmit={(values, formContext) => {
				post(postMapper(values), discoveryContext, postParams)
					.chain(formContext.events())
					.chain(events)
					.on("response", data => onSuccess(navigate, values, data));
			}}
			labelCol={{span: 8}}
			labelAlign={"left"}
			wrapperCol={{span: 24}}
			scrollToFirstError
			initialValues={initialMapper() as any}
			{...props}
		/>
	);
};
