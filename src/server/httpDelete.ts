import axios, {AxiosRequestConfig} from "axios";
import {handler} from "./handler";
import {IServerEvents} from "./interface";

export function httpDelete<TResponse = any>(
	href: string,
	config?: AxiosRequestConfig,
): IServerEvents<TResponse> {
	return handler(config => axios.delete<TResponse>(href, config), config);
}
