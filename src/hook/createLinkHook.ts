import {useEffect} from "react";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {httpGet} from "../server/httpGet";
import {IServerEvents} from "../server/interface";

/**
 * Create simple hook using effect under the hood.
 *
 * @param link
 */
export const createLinkHook = <TResponse = any>(link: string) => {
	return (
		events: IServerEvents<TResponse>,
		params?: Params,
	) => {
		const appContext = useAppContext();
		useEffect(() => {
			const cancelToken = httpGet(
				appContext.link(link, params),
				events,
			);
			return () => cancelToken.cancel();
		}, []);
	};
};
