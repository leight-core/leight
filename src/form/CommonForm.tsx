import {useAppContext} from "../app/AppContext";
import {useLayoutContext} from "../layout/LayoutContext";
import {useRouterContext} from "../router/RouterContext";
import {IServerEvents, IUpdateCallback} from "../server/interface";
import {ServerEvents} from "../server/ServerEvents";
import {Form, IFormProps} from "./Form";
import {IFormInitialMapper, IFormOnSuccess, IFormPostMapper} from "./interface";

export interface ICommonFormProps<TData extends Object, TValues extends Object> extends Partial<Omit<IFormProps<TValues>, "name">> {
	/**
	 * Name of the form.
	 */
	name: string
	/**
	 * What to do on form submit.
	 */
	post: IUpdateCallback<any, TData>
	/**
	 * Map form data to data being sent to server.
	 */
	postMapper?: IFormPostMapper<TData, TValues>
	/**
	 * Map data to the initial state of the form (if any).
	 */
	initialMapper?: IFormInitialMapper<TData, TValues>
	/**
	 * Called when a form is successfully committed.
	 */
	onSuccess?: IFormOnSuccess<TData>
	/**
	 * Initial form data if any.
	 */
	data?: TData | null
	/**
	 * Optional events if needed to be hooked in.
	 */
	events?: IServerEvents
}

export const CommonForm = <TData extends Object, TValues = any>(
	{
		post,
		postMapper = (data, values) => values,
		initialMapper = data => data as any,
		data = null,
		onSuccess = () => null,
		events = ServerEvents(),
		...props
	}: ICommonFormProps<TData, TValues>) => {
	const appContext = useAppContext();
	const layoutContext = useLayoutContext();
	const navigate = useRouterContext().useNavigate();
	return (
		<Form<TValues>
			colon={false}
			onSubmit={(values, formContext) => {
				layoutContext.blockContext.block();
				post(postMapper(data, values), appContext)
					.chain(formContext.events())
					.on("response", data => {
						onSuccess(navigate, data);
						layoutContext.blockContext.unblock();
					});
			}}
			labelCol={{span: 8}}
			labelAlign={"left"}
			wrapperCol={{span: 16}}
			scrollToFirstError
			initialValues={initialMapper(data)}
			{...props}
		/>
	);
};
