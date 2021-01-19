import axios, {CancelTokenSource} from "axios";
import {IEvents} from "../utils/interface";
import {axiosError, axiosSuccess} from "./events";
import {IServerEvents} from "./interface";

/**
 * simple http get; returns cancel token
 */
export function httpGet(
	href: string,
	events: IEvents<IServerEvents>,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	events.call("request");
	axios.get(href, {
		cancelToken: cancelToken.token,
	})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
