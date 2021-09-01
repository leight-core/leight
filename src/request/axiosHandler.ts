import {axiosError, axiosSuccess, RequestEvents} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export const axiosHandler = (call: (config: AxiosRequestConfig) => Promise<any>, config?: AxiosRequestConfig) => {
	const cancelToken = axios.CancelToken.source();
	const events = RequestEvents();
	events
		.on("request", () => {
			call({cancelToken: cancelToken.token, ...config})
				.then(response => axiosSuccess(response, events))
				.catch(error => axiosError(error, events));
		}, 1000)
		.on("dismiss", () => cancelToken.cancel("Dismissed Events."));
	setTimeout(() => events.handler("request")(), 0);
	return events;
};
