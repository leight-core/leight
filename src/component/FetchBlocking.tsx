import {message} from "antd";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";
import {IGetCallback, IServerEvents} from "../server/interface";
import {Events} from "../utils/Events";
import {useViewContext} from "../view/ViewContext";
import {Fetch, IFetchProps} from "./Fetch";

export interface IFetchBlockingProps<TData> extends Omit<IFetchProps<TData>, "fetch"> {
	/**
	 * Fetch callback to get data.
	 */
	fetch: IGetCallback
	/**
	 * Optional params for fetch callback.
	 */
	params?: Params
	/**
	 * Mapper used to map fetched data into layout context's data.
	 */
	mapper?: (data: TData) => any
	/**
	 * Do initial block on request; this could be useful, when there are more fetches on a single page.
	 *
	 * Defaults to false as usually a view is blocked by default.
	 */
	block?: boolean
	/**
	 * When fetch is done, unblock view context; useful when a context view is re-rendered, thus blocked more
	 * times - this will ensure a view is unblocked.
	 *
	 * Defaults to false.
	 */
	unblock?: boolean
}

export const FetchBlocking = <TData extends Object>({fetch, mapper = data => data, params, deps = [], block = false, unblock = false, children, ...props}: IFetchBlockingProps<TData>) => {
	const appContext = useAppContext();
	const viewContext = useViewContext();
	const layoutContext = useLayoutContext();
	const moduleContext = useModuleContext();
	return (
		<Fetch<TData>
			fetch={(setData) => {
				setData(null);
				const token = fetch(
					appContext,
					Events<IServerEvents>()
						.on("request", () => {
							block && viewContext.blockContext.block();
						})
						.on<TData>("success", data => {
							layoutContext.setData(mapper(data));
							setData(data);
						})
						.on("catch", _ => {
							viewContext.blockContext.unblock(unblock);
							message.error(moduleContext.t("error-occurred"));
						})
						.on("done", _ => {
							viewContext.blockContext.unblock(unblock);
						}),
					params,
				);
				return () => token.cancel();
			}}
			children={children}
			deps={[params].concat(deps)}
			{...props}
		/>
	);
};
