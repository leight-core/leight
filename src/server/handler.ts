import axios, {AxiosRequestConfig} from "axios";
import {ServerEventPriority} from "./constants";
import {axiosError, axiosSuccess} from "./events";
import {ServerEvents} from "./ServerEvents";

export const handler = (call: (config: AxiosRequestConfig) => Promise<any>, config?: AxiosRequestConfig) => {
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
