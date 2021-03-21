import axios, {AxiosRequestConfig} from "axios";
import {ServerRequestPriority} from "./constants";
import {axiosError, axiosSuccess} from "./events";
import {IServerEvents} from "./interface";
import {ServerEvents} from "./ServerEvents";

export function httpPut<TRequest = any, TResponse = any>(
	href: string,
	data: TRequest,
	config?: AxiosRequestConfig,
): IServerEvents<TResponse> {
	const events = ServerEvents<TResponse>();
	events.on("request", () => {
		const cancelToken = axios.CancelToken.source();
		axios.put<TResponse>(href, data, {cancelToken: cancelToken.token, ...config})
			.then(response => axiosSuccess(response, events))
			.catch(error => axiosError(error, events));
	}, ServerRequestPriority);
	setTimeout(() => events.handler("request")(data), 0);
	return events;
}
