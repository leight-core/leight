import axios, {CancelTokenSource} from "axios";
import {axiosError, axiosSuccess} from "./events";
import {IServerEvents} from "./interface";

export function httpPost<TRequest = any, TResponse = any>(
	href: string,
	data: TRequest,
	events: IServerEvents<TResponse>,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	events.handler("request")(data);
	axios.post<TResponse>(href, data, {
		cancelToken: cancelToken.token,
	})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
