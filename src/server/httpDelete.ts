import axios, {AxiosRequestConfig} from "axios";
import {ServerRequestPriority} from "./constants";
import {axiosError, axiosSuccess} from "./events";
import {IServerEvents} from "./interface";
import {ServerEvents} from "./ServerEvents";

export function httpDelete<TResponse = any>(
	href: string,
	config?: AxiosRequestConfig,
): IServerEvents<TResponse> {
	const events = ServerEvents<TResponse>();
	events.on("request", () => {
		const cancelToken = axios.CancelToken.source();
		axios.delete<TResponse>(href, {cancelToken: cancelToken.token, ...config})
			.then(response => axiosSuccess(response, events))
			.catch(error => axiosError(error, events));
	}, ServerRequestPriority);
	setTimeout(() => events.handler("request")(), 0);
	return events;
}
