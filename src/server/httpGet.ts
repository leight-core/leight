import axios from "axios";
import {ServerRequestPriority} from "./constants";
import {axiosError, axiosSuccess} from "./events";
import {IServerEvents} from "./interface";
import {ServerEvents} from "./ServerEvents";

export function httpGet<TResponse = any>(
	href: string,
): IServerEvents<TResponse> {
	const events = ServerEvents<TResponse>();
	events.on("request", () => {
		const cancelToken = axios.CancelToken.source();
		axios.get<TResponse>(href, {cancelToken: cancelToken.token})
			.then(response => axiosSuccess(response, events))
			.catch(error => axiosError(error, events));
	}, ServerRequestPriority);
	setTimeout(() => events.handler("request")(), 0);
	return events;
}
