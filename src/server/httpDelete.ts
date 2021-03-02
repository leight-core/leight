import axios, {CancelTokenSource} from "axios";
import {axiosError, axiosSuccess} from "./events";
import {IServerEvents} from "./interface";

export function httpDelete<TResponse = any>(
	href: string,
	events: IServerEvents<TResponse>,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	events.handler("request")();
	axios.delete<TResponse>(href, {
		cancelToken: cancelToken.token,
	})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
