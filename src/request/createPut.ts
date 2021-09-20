import {axiosHandler, IQueryParams, IRequestHookCallback, IRequestHookResult, RequestEvents, useLinkContext, useOptionalDiscoveryContext} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";
import {useQuery} from "react-query";

export function createPutHook<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IRequestHookCallback<TQuery, TRequest, TResponse> {
	return (request: TRequest, query?: TQuery, config?: AxiosRequestConfig): IRequestHookResult<TResponse> => {
		const events = RequestEvents<TResponse>();
		const linkContext = useLinkContext();
		const discoveryContext = useOptionalDiscoveryContext();
		const result = useQuery([link, {query, config}], () => {
			return new Promise<TResponse>((resolve, reject) => {
				axiosHandler(config => axios.put<TResponse>(discoveryContext ? discoveryContext.link(link, query) : linkContext.generate(link, query), request, config), config)
					.on("response", resolve)
					.on("error", reject)
					.chain(events);
			});
		});
		return {events, result};
	};
}
