import axios, {CancelTokenSource} from "axios";
import {IEvents} from "../utils/Events";
import {axiosError, axiosSuccess} from "./events";

export function httpPost<TData>(
	href: string,
	data: TData,
	events: IEvents,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	axios.post(href, data, {cancelToken: cancelToken.token})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
