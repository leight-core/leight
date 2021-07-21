import {message} from "antd";
import {useTranslation} from "react-i18next";
import {useBlockContext} from "../block/BlockContext";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IParams} from "../interface/interface";
import {IGetCallback, IServerEvents} from "../server/interface";
import {ServerEvents} from "../server/ServerEvents";
import {Fetch, IFetchProps} from "./Fetch";

export interface IFetchBlockingProps<TResponse = any> extends Omit<IFetchProps<TResponse>, "fetch"> {
	/**
	 * Base translation for the component.
	 */
	translation: string;
	/**
	 * Fetch callback to get data.
	 */
	fetch: IGetCallback<TResponse>;
	/**
	 * Optional params for fetch callback.
	 */
	params?: IParams;
	/**
	 * Do initial block on request; this could be useful, when there are more fetches on a single page.
	 *
	 * Defaults to false as usually a view is blocked by default.
	 */
	block?: boolean;
	/**
	 * When fetch is done, unblock view context; useful when a context view is re-rendered, thus blocked more
	 * times - this will ensure a view is unblocked.
	 *
	 * Defaults to false.
	 */
	unblock?: boolean;
	/**
	 * If there is a need to hook deeply into server events, this is a way.
	 */
	events?: IServerEvents<TResponse>;
	/**
	 * Optional external state update if needed; state is updated based on the lifecycle of request:
	 * - set undefined
	 * - set data (if success)
	 * - set undefined (if changed)
	 * - set data (if success)
	 * - and so on
	 */
	setState?: (data?: TResponse) => void;
}

export const FetchBlocking = <TResponse extends any>({translation, fetch, setState = () => null, params, events = ServerEvents(), deps = [], block = false, unblock = false, children, ...props}: IFetchBlockingProps<TResponse>) => {
	const discoveryContext = useDiscoveryContext();
	const blockContext = useBlockContext();
	const {t} = useTranslation();
	return (
		<Fetch<TResponse>
			fetch={setData => {
				/**
				 * Setting data to undefined forces component to render loading.
				 */
				setData(undefined);
				setState(undefined);
				return fetch(discoveryContext, params)
					.on("request", () => {
						block && blockContext.block();
					})
					.on("response", data => {
						setData(data);
						setState(data);
					})
					.on("catch", () => {
						blockContext.unblock(unblock);
						message.error(t(translation + ".fetch.error-occurred"));
					})
					.on("done", () => blockContext.unblock(unblock))
					.chain(events)
					.cleaner();
			}}
			children={children}
			deps={deps}
			{...props}
		/>
	);
};
