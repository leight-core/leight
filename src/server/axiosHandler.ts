import {axiosError, axiosSuccess, ServerEventPriority, ServerEvents} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export const axiosHandler = (call: (config: AxiosRequestConfig) => Promise<any>, config?: AxiosRequestConfig) => {
	const cancelToken = axios.CancelToken.source();
	const events = ServerEvents();
	events
		.on("request", () => {
			call({cancelToken: cancelToken.token, ...config})
				.then(response => axiosSuccess(response, events))
				.catch(error => axiosError(error, events));
		}, ServerEventPriority.Request.request)
		.on("dismiss", () => cancelToken.cancel("Dismissed Events."));
	setTimeout(() => events.handler("request")(), 0);
	return events;
};
