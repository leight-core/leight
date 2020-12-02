import axios, {CancelTokenSource} from "axios";
import {IEvents} from "../utils/Events";
import {axiosError, axiosSuccess} from "./events";

export function httpPut<TRequest = any>(
	href: string,
	data: TRequest,
	events: IEvents,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	axios.put(href, data, {cancelToken: cancelToken.token})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
