import {message} from "antd";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {useBlockContext} from "../block/BlockContext";
import {useLayoutContext} from "../layout/LayoutContext";
import {IGetCallback} from "../server/interface";
import {Fetch, IFetchProps} from "./Fetch";
import {IFetchMapper} from "./interface";

export interface IFetchBlockingProps<TResponse = any> extends Omit<IFetchProps<TResponse>, "fetch"> {
	/**
	 * Base translation for the component.
	 */
	translation: string
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

export const FetchBlocking = <TResponse extends any>({translation, fetch, mapper = data => data, params, deps = [], block = false, unblock = false, children, ...props}: IFetchBlockingProps<TResponse>) => {
	const appContext = useAppContext();
	const blockContext = useBlockContext();
	const layoutContext = useLayoutContext();
	return (
		<Fetch<TResponse>
			fetch={(setData) => {
				/**
				 * Setting data to undefined forces component to render loading.
				 */
				setData(undefined);
				const events = fetch(appContext, params)
					.on("request", () => {
						block && blockContext.block();
					})
					.on("response", data => {
						layoutContext.setData(mapper(data));
						setData(data);
					})
					.on("catch", () => {
						blockContext.unblock(unblock);
						message.error(translation + ".fetch.error-occurred");
					})
					.on("done", () => {
						blockContext.unblock(unblock);
					});
				return () => events.dismiss();
			}}
			children={children}
			deps={[params].concat(deps)}
			{...props}
		/>
	);
};
