import {message} from "antd";
import {Params} from "react-router";
import {useBlockContext} from "../block/BlockContext";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IGetCallback, IServerEvents} from "../server/interface";
import {ServerEvents} from "../server/ServerEvents";
import {Fetch, IFetchProps} from "./Fetch";

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
	events?: IServerEvents<TResponse>
}

export const FetchBlocking = <TResponse extends any>({translation, fetch, params, events = ServerEvents(), deps = [], block = false, unblock = false, children, ...props}: IFetchBlockingProps<TResponse>) => {
	const discoveryContext = useDiscoveryContext();
	const blockContext = useBlockContext();
	return (
		<Fetch<TResponse>
			fetch={(setData) => {
				/**
				 * Setting data to undefined forces component to render loading.
				 */
				setData(undefined);
				const current = fetch(discoveryContext, params)
					.on("request", () => {
						block && blockContext.block();
					})
					.on("response", data => {
						setData(data);
					})
					.on("catch", () => {
						blockContext.unblock(unblock);
						message.error(translation + ".fetch.error-occurred");
					})
					.on("done", () => {
						blockContext.unblock(unblock);
					})
					.chain(events);
				return () => current.dismiss();
			}}
			children={children}
			deps={[params].concat(deps)}
			{...props}
		/>
	);
};
