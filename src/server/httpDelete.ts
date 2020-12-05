import axios, {CancelTokenSource} from "axios";
import {IEvents} from "../utils/Events";
import {axiosError, axiosSuccess} from "./events";

export function httpDelete(
	href: string,
	events: IEvents,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	axios.delete(href, {
		cancelToken: cancelToken.token,
	})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
