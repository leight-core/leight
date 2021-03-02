import axios, {CancelTokenSource} from "axios";
import {axiosError, axiosSuccess} from "./events";
import {IServerEvents} from "./interface";

/**
 * simple http get; returns cancel token
 */
export function httpGet<TResponse = any>(
	href: string,
	events: IServerEvents<TResponse>,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	events.handler("request")();
	axios.get<TResponse>(href, {
		cancelToken: cancelToken.token,
	})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
