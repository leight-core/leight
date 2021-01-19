import {useEffect} from "react";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {httpPost} from "../server/httpPost";
import {IServerEvents} from "../server/interface";
import {IEvents} from "../utils/interface";

/**
 * Create simple hook using effect under the hood.
 *
 * @param link
 */
export const createPostHook = (link: string) => {
	return (
		data: any,
		events: IEvents<IServerEvents>,
		params?: Params,
	) => {
		const appContext = useAppContext();
		useEffect(() => {
			const cancelToken = httpPost(
				appContext.link(link, params),
				data,
				events,
			);
			return () => cancelToken.cancel();
		}, []);
	};
};
