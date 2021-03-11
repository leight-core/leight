import {message} from "antd";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";
import {IGetCallback} from "../server/interface";
import {useViewContext} from "../view/ViewContext";
import {Fetch, IFetchProps} from "./Fetch";
import {IFetchMapper} from "./interface";

export interface IFetchBlockingProps<TResponse = any> extends Omit<IFetchProps<TResponse>, "fetch"> {
	/**
	 * Fetch callback to get data.
	 */
	fetch: IGetCallback<TResponse>
	/**
	 * Optional params for fetch callback.
	 */
	params?: Params
	/**
	 * Mapper used to map fetched data into layout context's data.
	 */
	mapper?: IFetchMapper<TResponse>
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

export const FetchBlocking = <TResponse extends any>({fetch, mapper = data => data, params, deps = [], block = false, unblock = false, children, ...props}: IFetchBlockingProps<TResponse>) => {
	const appContext = useAppContext();
	const viewContext = useViewContext();
	const layoutContext = useLayoutContext();
	const moduleContext = useModuleContext();
	return (
		<Fetch<TResponse>
			fetch={(setData) => {
				/**
				 * Setting data to undefined forces component to render loading.
				 */
				setData(undefined);
				const events = fetch(appContext, params)
					.on("request", () => {
						block && viewContext.blockContext.block();
					})
					.on("response", data => {
						layoutContext.setData(mapper(data));
						setData(data);
					})
					.on("catch", () => {
						viewContext.blockContext.unblock(unblock);
						message.error(moduleContext.t("error-occurred"));
					})
					.on("done", () => {
						viewContext.blockContext.unblock(unblock);
					});
				return () => events.dismiss();
			}}
			children={children}
			deps={[params].concat(deps)}
			{...props}
		/>
	);
};
