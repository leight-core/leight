import {axiosHandler, IQueryParams, IRequestHookCallback, IRequestHookResult, RequestEvents, useLinkContext, useOptionalDiscoveryContext} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";
import {useQuery} from "react-query";

export function createGetHook<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IRequestHookCallback<TQuery, void, TResponse> {
	return (request: void, query?: TQuery, config?: AxiosRequestConfig): IRequestHookResult<TResponse> => {
		const events = RequestEvents<TResponse>();
		const linkContext = useLinkContext();
		const discoveryContext = useOptionalDiscoveryContext();
		const result = useQuery([link, {query, config}], () => {
			return new Promise<TResponse>((resolve, reject) => {
				axiosHandler(config => axios.get<TResponse>(discoveryContext ? discoveryContext.link(link, query) : linkContext.generate(link, query), config), config)
					.on("response", resolve)
					.on("error", reject)
					.chain(events);
			});
		});
		return {events, result};
	};
}
