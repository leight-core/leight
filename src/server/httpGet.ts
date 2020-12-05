import axios, {CancelTokenSource} from "axios";
import {IEvents} from "../utils/Events";
import {requestTimeout} from "./constants";
import {axiosError, axiosSuccess} from "./events";

/**
 * simple http get; returns cancel token
 */
export function httpGet(
	href: string,
	events: IEvents,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	axios.get(href, {
		cancelToken: cancelToken.token,
		timeout: requestTimeout,
	})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
