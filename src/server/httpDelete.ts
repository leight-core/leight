import axios, {CancelTokenSource} from "axios";
import {IEvents} from "../utils/interface";
import {axiosError, axiosSuccess} from "./events";
import {IServerEvents} from "./interface";

export function httpDelete(
	href: string,
	events: IEvents<IServerEvents>,
): CancelTokenSource {
	const cancelToken = axios.CancelToken.source();
	events.call("request");
	axios.delete(href, {
		cancelToken: cancelToken.token,
	})
		.then(response => axiosSuccess(response, events))
		.catch(error => axiosError(error, events));
	return cancelToken;
}
