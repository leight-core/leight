import axios, {CancelTokenSource} from "axios";
import {IEvents} from "../utils/interface";
import {axiosError, axiosSuccess} from "./events";

export function httpPost<TRequest = any>(
	href: string,
	data: TRequest,
	events: IEvents,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	events.call("request", data);
	axios.post(href, data, {
		cancelToken: cancelToken.token,
	})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
